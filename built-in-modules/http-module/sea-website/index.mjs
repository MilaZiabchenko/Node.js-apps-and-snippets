import { createServer } from 'http';
import { createReadStream } from 'fs';

const sendFile = (res, status, fileType, fileName) => {
  res.writeHead(status, { 'Content-Type': fileType });
  createReadStream(fileName).pipe(res);
};

createServer((req, res) => {
  switch (req.url) {
    case '/':
      return sendFile(res, 200, 'text/html', './home-page.html');
    case '/img/ships-in-the-sea':
      return sendFile(res, 200, 'image/jpg', './ships-in-the-sea.jpg');
    case '/styles':
      return sendFile(res, 200, 'text/css', './style.css');
    case '*':
      return sendFile(res, 404, 'text/html', './404.html');
    default:
      return sendFile(res, 404, 'text/html', './404.html');
  }
}).listen(3000);

console.log('Website at 3000...');
