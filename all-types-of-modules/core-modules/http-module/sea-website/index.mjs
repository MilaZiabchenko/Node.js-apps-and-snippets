import { createServer } from 'http';
import { createReadStream } from 'fs';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendFile = (res, status, fileType, fileName) => {
  res.writeHead(status, { 'Content-Type': fileType });
  createReadStream(`${path.join(__dirname, 'public', fileName)}`).pipe(res);
};

const PORT = 3000;

createServer((req, res) => {
  switch (req.url) {
    case '/':
      return sendFile(res, 200, 'text/html', 'index.html');
    case '/home':
      res.setHeader('Location', '/');

      return sendFile(res, 301, 'text/html', 'index.html');
    case '/ships-in-the-sea':
      return sendFile(res, 200, 'image/jpeg', 'images/ships-in-the-sea.jpeg');
    case '*':
      return sendFile(res, 404, 'text/html', '404.html');
    default:
      return sendFile(res, 404, 'text/html', '404.html');
  }
}).listen(PORT, () =>
  console.log(`Sea website is now on port http://localhost:${PORT}...`)
);
