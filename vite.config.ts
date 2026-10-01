import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-contact-handler',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                const gmailUser = env.GMAIL_USER || 'amber.incident@gmail.com';
                const gmailPass = env.GMAIL_APP_PASSWORD;

                if (!data.email) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Work email is required' }));
                  return;
                }

                if (!gmailPass) {
                  console.log('\n[Amber Contact Dev] GMAIL_APP_PASSWORD is not set in .env.');
                  console.log('[Amber Contact Dev] Simulating lead delivery to:', gmailUser);
                  console.log('[Lead Payload]:', JSON.stringify(data, null, 2));
                  res.setHeader('Content-Type', 'application/json');
                  res.statusCode = 200;
                  res.end(JSON.stringify({ success: true, simulated: true }));
                  return;
                }

                const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: gmailUser,
                    pass: gmailPass,
                  },
                });

                await transporter.sendMail({
                  from: `"Amber Intake" <${gmailUser}>`,
                  to: gmailUser,
                  replyTo: data.email,
                  subject: `🚨 New Amber Lead: ${data.name ? `${data.name} · ` : ''}${data.email} (${data.selectedPlan || 'Inquiry'})`,
                  text: `New Lead: ${data.name || 'Anonymous'}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nPlan: ${data.selectedPlan}\nInfra: ${data.selectedInfra} (${data.clusterScale || 'N/A'})\n\nMessage:\n${data.message || 'N/A'}\n\n(Hit Reply to respond directly to ${data.email})`,
                });

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, message: 'Lead dispatched' }));
              } catch (err: any) {
                console.error('[Amber Contact Error]:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Failed to dispatch email' }));
              }
            });
          });
        }
      }
    ],
    server: {
      port: 3000,
      host: true,
    }
  };
});
