const http = require('http');
const fs = require('fs');
const path = require('path');

const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4'
};

http.createServer((req, res) => {
  let p = '.' + (req.url === '/' ? '/index.html' : req.url.split('?')[0]);
  const ext = path.extname(p);
  const stat = fs.statSync(p, { throwIfNoEntry: false });

  if (!stat) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  // Range requests for video streaming
  if (req.headers.range && ext === '.mp4') {
    const size = stat.size;
    const parts = req.headers.range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'video/mp4'
    });
    fs.createReadStream(p, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Type': types[ext] || 'application/octet-stream',
      'Content-Length': stat.size
    });
    fs.createReadStream(p).pipe(res);
  }
}).listen(3032, () => console.log('Server running on http://localhost:3032'));
