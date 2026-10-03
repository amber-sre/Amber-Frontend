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

    // 1. Direct raw bash script route for curl -fsSL https://ambersre.xyz/install.sh | bash
    if (url.pathname === '/install.sh') {
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

    // 2. Contact Intake API (/api/contact)
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }

      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        const body = await request.json().catch(() => ({}));
        const { name, email, phone, selectedPlan, selectedInfra, clusterScale, message } = body || {};

        if (!email || typeof email !== 'string' || !email.includes('@')) {
          return new Response(JSON.stringify({ error: 'A valid work email is required' }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }

        const gmailUser = env.GMAIL_USER || 'amber.incident@gmail.com';
        const gmailPass = env.GMAIL_APP_PASSWORD || 'wrbdpvqxtuvadiit';
        const tgBotToken = env.TELEGRAM_BOT_TOKEN || '8927729248:AAEcTTtjQY0ZOgK93ChuZ5K-KOO5iud5izI';
        const tgChatId = env.TELEGRAM_CHAT_ID || '6740343041';

        const subject = `🚨 New Amber Lead: ${name ? `${name} · ` : ''}${email} (${selectedPlan || 'Inquiry'})`;

        const plainText = [
          'New Amber Lead Received',
          '===============================================',
          `Name:           ${name || 'Not provided'}`,
          `Work Email:     ${email}`,
          `Phone:          ${phone || 'Not provided'}`,
          `Selected Tier:  ${selectedPlan || 'General Inquiry'}`,
          `Infrastructure: ${selectedInfra || 'AWS'} (${clusterScale || 'Not specified'})`,
          '',
          'Message:',
          '-----------------------------------------------',
          message || 'No additional message provided.',
          '===============================================',
          `Hit 'Reply' to respond directly to ${email}.`
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
                <div class="badge">${escapeHtml(selectedPlan || 'Lead')}</div>
                <h1 class="title">New Client Inquiry Received</h1>
              </div>
              <div class="content">
                <table>
                  <tr>
                    <td class="label">Name</td>
                    <td class="value">${escapeHtml(name || 'Not provided')}</td>
                  </tr>
                  <tr>
                    <td class="label">Work Email</td>
                    <td class="value"><a href="mailto:${escapeHtml(email)}" style="color:#d97706;text-decoration:none;">${escapeHtml(email)}</a></td>
                  </tr>
                  <tr>
                    <td class="label">Phone / WhatsApp</td>
                    <td class="value">${phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#1c1917;text-decoration:none;">${escapeHtml(phone)}</a>` : 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td class="label">Selected Tier</td>
                    <td class="value accent">${escapeHtml(selectedPlan || 'General')}</td>
                  </tr>
                  <tr>
                    <td class="label">Infrastructure</td>
                    <td class="value">${escapeHtml(selectedInfra || 'AWS')} ${clusterScale ? `(${escapeHtml(clusterScale)})` : ''}</td>
                  </tr>
                </table>
                ${message ? `
                  <div class="message-box">
                    <div class="message-title">Message / Architecture Notes</div>
                    <p class="message-text">${escapeHtml(message)}</p>
                  </div>
                ` : ''}
              </div>
              <div class="footer">
                Click <strong>Reply</strong> to respond directly to <strong>${escapeHtml(email)}</strong>.
              </div>
            </div>
          </body>
          </html>
        `;

        // 1. Dispatch Email to Gmail
        let emailSent = false;
        try {
          await sendGmailViaSocket({
            user: gmailUser,
            pass: gmailPass,
            to: gmailUser,
            replyTo: email,
            subject,
            text: plainText,
            html: htmlBody
          });
          emailSent = true;
        } catch (emailErr) {
          console.error('[Worker Email Error]:', emailErr);
        }

        // 2. Dispatch Instant Push Notification to Telegram Bot
        try {
          await fetch(`https://api.telegram.org/bot${tgBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: tgChatId,
              text: `🚨 <b>New Amber Lead Received!</b>\n\n` +
                    `👤 <b>Name:</b> ${escapeHtml(name || 'N/A')}\n` +
                    `📧 <b>Email:</b> ${escapeHtml(email)}\n` +
                    `📞 <b>Phone:</b> ${escapeHtml(phone || 'N/A')}\n` +
                    `📦 <b>Tier:</b> ${escapeHtml(selectedPlan || 'Inquiry')}\n` +
                    `☁️ <b>Infra:</b> ${escapeHtml(selectedInfra || 'AWS')} (${escapeHtml(clusterScale || 'Not specified')})\n\n` +
                    `📝 <b>Message:</b>\n${escapeHtml(message || 'None')}\n\n` +
                    `⚡ <i>Dispatched from ambersre.xyz</i>`,
              parse_mode: 'HTML'
            })
          });
        } catch (tgErr) {
          console.error('[Worker Telegram Error]:', tgErr);
        }

        return new Response(JSON.stringify({
          success: true,
          emailDispatched: emailSent,
          message: 'Lead notification received and dispatched'
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (err) {
        console.error('[Worker Contact Error]:', err);
        return new Response(JSON.stringify({ error: 'Internal intake error' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers
    });
  }
};
