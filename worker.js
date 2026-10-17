import { connect } from 'cloudflare:sockets';

// Helper: Escape HTML to prevent injection in email templates
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Helper: Restrict and validate CORS origins
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigins = [
    'https://ambersre.xyz',
    'https://www.ambersre.xyz',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
  ];
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : 'https://ambersre.xyz';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

// Minimal RFC 821/2821 SMTP client over direct TLS socket
async function sendGmailViaSocket(options) {
  const { user, pass, to, replyTo, subject, text, html } = options;
  const socket = connect("smtp.gmail.com:465", { secureTransport: "on" });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  let buffer = '';
  async function readLine() {
    while (!buffer.includes('\n')) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
    }
    const idx = buffer.indexOf('\n');
    if (idx === -1) {
      const line = buffer;
      buffer = '';
      return line;
    }
    const line = buffer.slice(0, idx + 1);
    buffer = buffer.slice(idx + 1);
    return line;
  }

  async function readResponse() {
    let full = '';
    while (true) {
      const line = await readLine();
      full += line;
      if (line.length >= 4 && line[3] === ' ') {
        break;
      }
    }
    return full;
  }

  async function sendCommand(cmd) {
    await writer.write(encoder.encode(cmd + '\r\n'));
    return await readResponse();
  }

  // 1. Initial greeting
  const greeting = await readResponse();
  if (!greeting.startsWith('220')) throw new Error('SMTP Greeting failed: ' + greeting);

  // 2. EHLO
  const ehlo = await sendCommand('EHLO ambersre.xyz');
  if (!ehlo.startsWith('250')) throw new Error('EHLO failed: ' + ehlo);

  // 3. AUTH LOGIN
  const authPrompt = await sendCommand('AUTH LOGIN');
  if (!authPrompt.startsWith('334')) throw new Error('AUTH LOGIN prompt failed: ' + authPrompt);

  // 4. Send Base64 Username
  const userPrompt = await sendCommand(btoa(user));
  if (!userPrompt.startsWith('334')) throw new Error('Username challenge failed: ' + userPrompt);

  // 5. Send Base64 Password
  const passPrompt = await sendCommand(btoa(pass));
  if (!passPrompt.startsWith('235')) throw new Error('Password authentication failed: ' + passPrompt);

  // 6. MAIL FROM
  const mailFrom = await sendCommand(`MAIL FROM:<${user}>`);
  if (!mailFrom.startsWith('250')) throw new Error('MAIL FROM failed: ' + mailFrom);

  // 7. RCPT TO
  const rcptTo = await sendCommand(`RCPT TO:<${to}>`);
  if (!rcptTo.startsWith('250')) throw new Error('RCPT TO failed: ' + rcptTo);

  // 8. DATA
  const dataPrompt = await sendCommand('DATA');
  if (!dataPrompt.startsWith('354')) throw new Error('DATA prompt failed: ' + dataPrompt);

  // 9. Email Body & Headers
  const boundary = '----=_Part_' + Date.now();
  const rawEmail = [
    `From: "Amber Intake" <${user}>`,
    `To: <${to}>`,
    replyTo ? `Reply-To: <${replyTo}>` : '',
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    text,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    html,
    '',
    `--${boundary}--`,
    '.'
  ].filter(Boolean).join('\r\n');

  const dataRes = await sendCommand(rawEmail);
  if (!dataRes.startsWith('250')) throw new Error('Message dispatch failed: ' + dataRes);

  // 10. QUIT
  try {
    await sendCommand('QUIT');
    writer.releaseLock();
    reader.releaseLock();
    socket.close();
  } catch (_) {}

  return true;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Direct raw bash script route for install.sh and community.sh
    if (url.pathname === '/install.sh' || url.pathname === '/community.sh') {
      const scriptRes = await env.ASSETS.fetch(request);
      if (scriptRes.ok) {
        const scriptText = await scriptRes.text();
        return new Response(scriptText, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=300'
          }
        });
      }
    }

    // 2. Custom Pricing Calculation Engine (/api/calculate-quote)
    // Server-side only: Formula, multipliers, and margins are strictly hidden from client bundle/devtools.
    if (url.pathname === '/api/calculate-quote' || url.pathname === '/api/calculate-quote/') {
      const corsHeaders = getCorsHeaders(request);
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: corsHeaders
        });
      }

      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      try {
        const body = await request.json().catch(() => ({}));
        let { nodes = 100, services = 25, mutatingFixes = 100, dedicatedSla = false, billingCycle = 'annual' } = body || {};

        // Sanitize & enforce boundaries (Supports hyper-scale up to 100k nodes)
        nodes = Math.max(1, Math.min(100000, Number(nodes) || 100));
        services = Math.max(1, Math.min(10000, Number(services) || 25));
        mutatingFixes = Math.max(10, Math.min(100000, Number(mutatingFixes) || 100));
        dedicatedSla = Boolean(dedicatedSla);

        // Core Algorithm matching Growth ($499), Autonomous ($1,799), and Response ($3,499)
        let monthlyBaseRate = 0;

        if (nodes <= 30 && services <= 15 && mutatingFixes <= 50) {
          monthlyBaseRate = 499;
        } else if (nodes <= 100 && services <= 35 && mutatingFixes <= 100) {
          monthlyBaseRate = 1799;
        } else if (nodes <= 500 && services <= 150 && mutatingFixes <= 500) {
          const nodeExcess = Math.max(0, nodes - 100);
          const servExcess = Math.max(0, services - 35);
          const fixExcess = Math.max(0, mutatingFixes - 100);
          const addOn = (nodeExcess * 2.5) + (servExcess * 3) + (fixExcess * 0.7);
          monthlyBaseRate = Math.round(1799 + addOn);
        } else {
          const nodeExcess = Math.max(0, nodes - 500);
          const servExcess = Math.max(0, services - 150);
          const fixExcess = Math.max(0, mutatingFixes - 500);
          const addOn = (nodeExcess * 2) + (servExcess * 4) + (fixExcess * 0.5);
          monthlyBaseRate = Math.round(3499 + addOn);
        }

        // Annual discount: 2 months free (~17% discount)
        const discount = Math.round(monthlyBaseRate * (2 / 12));

        const annualDiscountMonthly = monthlyBaseRate - discount;
        const finalMonthlyPrice = billingCycle === 'annual' ? annualDiscountMonthly : monthlyBaseRate;
        const annualTotal = annualDiscountMonthly * 12;
        const annualSavings = discount * 12;

        return new Response(JSON.stringify({
          success: true,
          monthlyPrice: finalMonthlyPrice,
          monthlyBaseRate,
          annualDiscountMonthly,
          annualTotal,
          annualSavings,
          billingCycle,
          quotas: {
            nodes,
            services,
            mutatingFixes
          }
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Calculation failed' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    // 3. Contact Intake API (/api/contact)
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      const corsHeaders = getCorsHeaders(request);
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: corsHeaders
        });
      }

      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const contentLength = parseInt(request.headers.get('content-length') || '0', 10);
      if (contentLength > 65536) {
        return new Response(JSON.stringify({ error: 'Payload too large' }), {
          status: 413,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      try {
        const body = await request.json().catch(() => ({}));
        const { name, email, phone, selectedPlan, selectedInfra, clusterScale, message } = body || {};

        const cleanEmail = typeof email === 'string' ? email.trim().slice(0, 120) : '';
        if (!cleanEmail || !cleanEmail.includes('@') || cleanEmail.includes('\r') || cleanEmail.includes('\n')) {
          return new Response(JSON.stringify({ error: 'A valid work email is required' }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            }
          });
        }

        const cleanName = typeof name === 'string' ? name.trim().slice(0, 100) : '';
        const cleanPhone = typeof phone === 'string' ? phone.trim().slice(0, 50) : '';
        const cleanPlan = typeof selectedPlan === 'string' ? selectedPlan.trim().slice(0, 60) : 'General Inquiry';
        const cleanInfra = typeof selectedInfra === 'string' ? selectedInfra.trim().slice(0, 60) : 'AWS';
        const cleanScale = typeof clusterScale === 'string' ? clusterScale.trim().slice(0, 60) : 'Not specified';
        const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 4000) : '';

        // Strict environment secrets — no plaintext fallback keys committed
        const gmailUser = env.GMAIL_USER || 'amber.incident@gmail.com';
        const gmailPass = env.GMAIL_APP_PASSWORD;
        const tgBotToken = env.TELEGRAM_BOT_TOKEN;
        const tgChatId = env.TELEGRAM_CHAT_ID;

        const subject = `🚨 New Amber Lead: ${cleanName ? `${cleanName} · ` : ''}${cleanEmail} (${cleanPlan})`;

        const plainText = [
          'New Amber Lead Received',
          '===============================================',
          `Name:           ${cleanName || 'Not provided'}`,
          `Work Email:     ${cleanEmail}`,
          `Phone:          ${cleanPhone || 'Not provided'}`,
          `Selected Tier:  ${cleanPlan}`,
          `Infrastructure: ${cleanInfra} (${cleanScale})`,
          '',
          'Message:',
          '-----------------------------------------------',
          cleanMessage || 'No additional message provided.',
          '===============================================',
          `Hit 'Reply' to respond directly to ${cleanEmail}.`
        ].join('\n');

        const htmlBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #faf8f5; margin: 0; padding: 20px; }
              .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
              .header { background: #0c0a09; padding: 24px; color: #ffffff; }
              .badge { display: inline-block; background: #d97706; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 8px; }
              .title { margin: 0; font-size: 20px; font-weight: 800; }
              .content { padding: 24px; }
              table { width: 100%; border-collapse: collapse; }
              tr { border-bottom: 1px solid #f5f5f4; }
              td { padding: 10px 0; font-size: 14px; }
              .label { color: #78716c; font-weight: 600; width: 140px; }
              .value { color: #1c1917; font-weight: 600; text-align: right; }
              .value.accent { color: #d97706; }
              .message-box { margin-top: 20px; padding: 16px; background: #f5f5f4; border-radius: 12px; border-left: 4px solid #d97706; }
              .message-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #78716c; margin-bottom: 6px; }
              .message-text { font-size: 14px; color: #1c1917; line-height: 1.6; white-space: pre-wrap; margin: 0; }
              .footer { padding: 16px 24px; background: #fafaf9; border-top: 1px solid #f5f5f4; font-size: 12px; color: #a8a29e; text-align: center; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <div class="badge">${escapeHtml(cleanPlan)}</div>
                <h1 class="title">New Client Inquiry Received</h1>
              </div>
              <div class="content">
                <table>
                  <tr>
                    <td class="label">Name</td>
                    <td class="value">${escapeHtml(cleanName || 'Not provided')}</td>
                  </tr>
                  <tr>
                    <td class="label">Work Email</td>
                    <td class="value"><a href="mailto:${escapeHtml(cleanEmail)}" style="color:#d97706;text-decoration:none;">${escapeHtml(cleanEmail)}</a></td>
                  </tr>
                  <tr>
                    <td class="label">Phone</td>
                    <td class="value">${cleanPhone ? `<a href="tel:${escapeHtml(cleanPhone)}" style="color:#1c1917;text-decoration:none;">${escapeHtml(cleanPhone)}</a>` : 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td class="label">Selected Tier</td>
                    <td class="value accent">${escapeHtml(cleanPlan)}</td>
                  </tr>
                  <tr>
                    <td class="label">Infrastructure</td>
                    <td class="value">${escapeHtml(cleanInfra)} (${escapeHtml(cleanScale)})</td>
                  </tr>
                </table>
                ${cleanMessage ? `
                  <div class="message-box">
                    <div class="message-title">Message / Architecture Notes</div>
                    <p class="message-text">${escapeHtml(cleanMessage)}</p>
                  </div>
                ` : ''}
              </div>
              <div class="footer">
                Click <strong>Reply</strong> to respond directly to <strong>${escapeHtml(cleanEmail)}</strong>.
              </div>
            </div>
          </body>
          </html>
        `;

        // 1. Dispatch Email to Gmail
        let emailSent = false;
        if (gmailPass) {
          try {
            await sendGmailViaSocket({
              user: gmailUser,
              pass: gmailPass,
              to: gmailUser,
              replyTo: cleanEmail,
              subject,
              text: plainText,
              html: htmlBody
            });
            emailSent = true;
          } catch (emailErr) {
            console.error('[Worker Email Error]:', emailErr);
          }
        } else {
          console.warn('[Worker] GMAIL_APP_PASSWORD secret is not configured in worker environment.');
        }

        // 2. Dispatch Instant Push Notification to Telegram Bot
        if (tgBotToken && tgChatId) {
          try {
            await fetch(`https://api.telegram.org/bot${tgBotToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: tgChatId,
                text: `🚨 <b>New Amber Lead Received!</b>\n\n` +
                      `👤 <b>Name:</b> ${escapeHtml(cleanName || 'N/A')}\n` +
                      `📧 <b>Email:</b> ${escapeHtml(cleanEmail)}\n` +
                      `📞 <b>Phone:</b> ${escapeHtml(cleanPhone || 'N/A')}\n` +
                      `📦 <b>Tier:</b> ${escapeHtml(cleanPlan)}\n` +
                      `☁️ <b>Infra:</b> ${escapeHtml(cleanInfra)} (${escapeHtml(cleanScale)})\n\n` +
                      `📝 <b>Message:</b>\n${escapeHtml(cleanMessage || 'None')}\n\n` +
                      `⚡ <i>Dispatched from ambersre.xyz</i>`,
                parse_mode: 'HTML'
              })
            });
          } catch (tgErr) {
            console.error('[Worker Telegram Error]:', tgErr);
          }
        } else {
          console.warn('[Worker] Telegram bot secrets not configured in worker environment.');
        }

        return new Response(JSON.stringify({
          success: true,
          emailDispatched: emailSent,
          message: 'Lead notification received and dispatched'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      } catch (err) {
        console.error('[Worker Contact Error]:', err);
        return new Response(JSON.stringify({ error: 'Internal intake error' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        });
      }
    }

    // 3. Fallback to static assets with security headers
    let assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status === 404) {
      const indexReq = new Request(new URL('/index.html', request.url), request);
      const indexRes = await env.ASSETS.fetch(indexReq);
      if (indexRes.ok) {
        assetResponse = indexRes;
      }
    }

    const headers = new Headers(assetResponse.headers);
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers
    });
  }
};
