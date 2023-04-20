const { createServer } = require('http');
const data = require('./cats.json');

createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/json' });

  if (req.url === '/') {
    res.end(JSON.stringify(data));
  } else if (req.url.toLowerCase() === '/biscuit') {
    const Biscuit = data.filter(cat => cat.name === 'Biscuit');

    res.end(JSON.stringify(Biscuit));
  } else if (req.url.toLowerCase() === '/jungle') {
    const Jungle = data.filter(cat => cat.name === 'Jungle');

    res.end(JSON.stringify(Jungle));
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
}).listen(3000);
