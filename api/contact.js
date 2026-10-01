import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers for safe cross-origin access
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, selectedPlan, selectedInfra, clusterScale, message } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid work email is required' });
  }

  const gmailUser = process.env.GMAIL_USER || 'amber.incident@gmail.com';
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailPass) {
    console.error('Server Configuration Error: GMAIL_APP_PASSWORD is not set in environment variables');
    return res.status(500).json({ error: 'Server email configuration missing' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const subject = `🚨 New Amber Lead: ${name ? `${name} · ` : ''}${email} (${selectedPlan || 'Inquiry'})`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #faf8f5; margin: 0; padding: 20px; }
        .card { max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #e7e5e4; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .header { background: #0c0a09; padding: 24px; color: #ffffff; }
        .badge { display: inline-block; background: #d97706; color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .title { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
        .content { padding: 24px; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f5f5f4; font-size: 14px; }
        .label { color: #78716c; font-weight: 600; width: 140px; }
        .value { color: #1c1917; font-weight: 500; text-align: right; }
        .value.accent { color: #d97706; font-weight: 700; }
        .message-box { margin-top: 20px; padding: 16px; background: #f5f5f4; border-radius: 12px; border-left: 4px solid #d97706; }
        .message-title { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #78716c; margin-bottom: 6px; letter-spacing: 0.05em; }
        .message-text { font-size: 14px; color: #1c1917; line-height: 1.6; white-space: pre-wrap; margin: 0; }
        .footer { padding: 16px 24px; background: #fafaf9; border-top: 1px solid #f5f5f4; font-size: 12px; color: #a8a29e; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="badge">${selectedPlan || 'Lead'}</div>
          <h1 class="title">New Client Inquiry Received</h1>
        </div>
        <div class="content">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f5f5f4;">
              <td style="padding: 10px 0; color: #78716c; font-weight: 600; font-size: 14px; width: 140px;">Name</td>
              <td style="padding: 10px 0; color: #1c1917; font-weight: 600; font-size: 14px; text-align: right;">${name || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f4;">
              <td style="padding: 10px 0; color: #78716c; font-weight: 600; font-size: 14px;">Work Email</td>
              <td style="padding: 10px 0; font-size: 14px; text-align: right;"><a href="mailto:${email}" style="color: #d97706; font-weight: 700; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f4;">
              <td style="padding: 10px 0; color: #78716c; font-weight: 600; font-size: 14px;">Phone / WhatsApp</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 14px; text-align: right;">${phone ? `<a href="tel:${phone}" style="color: #1c1917; text-decoration: none;">${phone}</a>` : 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f4;">
              <td style="padding: 10px 0; color: #78716c; font-weight: 600; font-size: 14px;">Selected Tier</td>
              <td style="padding: 10px 0; color: #d97706; font-weight: 700; font-size: 14px; text-align: right;">${selectedPlan || 'General'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f5f5f4;">
              <td style="padding: 10px 0; color: #78716c; font-weight: 600; font-size: 14px;">Infrastructure</td>
              <td style="padding: 10px 0; color: #1c1917; font-size: 14px; text-align: right;">${selectedInfra || 'AWS'} ${clusterScale ? `(${clusterScale})` : ''}</td>
            </tr>
          </table>

          ${message ? `
            <div class="message-box">
              <div class="message-title">Message / Architecture Notes</div>
              <p class="message-text">${message}</p>
            </div>
          ` : ''}
        </div>
        <div class="footer">
          Click <strong>Reply</strong> in your email app to write directly to <strong>${email}</strong>.
        </div>
      </div>
    </body>
    </html>
  `;

  const plainText = `
New Amber Lead Received
===============================================
Name:           ${name || 'Not provided'}
Work Email:     ${email}
Phone:          ${phone || 'Not provided'}
Selected Tier:  ${selectedPlan || 'General Inquiry'}
Infrastructure: ${selectedInfra || 'AWS'} (${clusterScale || 'Not specified'})

Message:
-----------------------------------------------
${message || 'No additional message provided.'}
===============================================
Hit 'Reply' to respond directly to ${email}.
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Amber Intake" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email, // <-- Allows instant 1-click reply to the user
      subject: subject,
      text: plainText,
      html: htmlBody,
    });

    return res.status(200).json({ success: true, message: 'Lead notification dispatched' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ error: 'Failed to dispatch email' });
  }
}
