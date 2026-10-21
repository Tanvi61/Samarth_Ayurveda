import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'file-protocol-compatibility',
      transformIndexHtml(html) {
        return html
          .replace(/\scrossorigin(?=[\s>])/gi, '')
          .replace(/href="\/fonts\//g, 'href="./fonts/')
          .replace(/url\('\/fonts\//g, "url('./fonts/");
      }
    },
    {
      name: 'mail-approval-relay',
      configureServer(server) {
        server.middlewares.use('/api/send-message', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const payload = JSON.parse(body);
                const targetEmail = 'tanvideshmukh6104@gmail.com';
                const fsRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': 'https://samarthayurveda.com',
                    'Referer': 'https://samarthayurveda.com/contact.html'
                  },
                  body: JSON.stringify(payload)
                });
                const data = await fsRes.json();
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
          } else {
            res.statusCode = 405;
            res.end();
          }
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        products: resolve(__dirname, 'products.html'),
        contact: resolve(__dirname, 'contact.html'),
        orders: resolve(__dirname, 'orders.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
});
