/**
 * Muhammad Samir Malik — Portfolio Web Server
 * Pure Node.js zero-dependency HTTP server for instant deployment
 * Compatible with Node.js 16+ (Local, Render, Railway, Heroku, AWS, VPS)
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Parse requested URL pathname
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(reqUrl.pathname);

  // Default route to index.html
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Resolve safe file path
  const filePath = path.join(PUBLIC_DIR, path.normalize(pathname).replace(/^(\.\.[\/\\])+/, ''));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 Fallback
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>404 Not Found | Muhammad Samir Malik</title>
          <style>
            body { font-family: sans-serif; text-align: center; padding: 60px 20px; background: #0B1526; color: #FFF; }
            a { color: #38A2FF; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The requested file was not found.</p>
          <p><a href="/">&larr; Return to Portfolio Home</a></p>
        </body>
        </html>
      `);
      return;
    }

    // Stream file content
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` Muhammad Samir Malik — Portfolio Server`);
  console.log(` Status: Running`);
  console.log(` Local URL: http://localhost:${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`====================================================`);
});
