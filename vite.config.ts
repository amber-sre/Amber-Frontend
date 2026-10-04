import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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

                if (!data.email) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Work email is required' }));
                  return;
                }

                console.log('\n[Amber Contact Dev] Lead received in local dev mode:');
                console.log('[Lead Payload]:', JSON.stringify(data, null, 2));
                console.log('[Simulated Recipient]:', gmailUser);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, simulated: true, message: 'Lead received in local dev mode' }));
                return;
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
