import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'node:path';
import fs from 'node:fs';

function serveUploads() {
  const uploadsDir = path.resolve('storage/uploads');
  return {
    name: 'serve-uploads',
    configureServer(server) {
      server.middlewares.use('/uploads', (req, res, next) => {
        const filePath = path.join(uploadsDir, decodeURIComponent(req.url.split('?')[0]));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.webp': 'image/webp',
            '.mp4': 'video/mp4',
            '.pdf': 'application/pdf'
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), serveUploads()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});
