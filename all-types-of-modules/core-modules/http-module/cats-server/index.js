const { createServer } = require('http');
const cats = require('./cats.json');

const Biscuit = cats.filter(cat => cat.name === 'Biscuit');
const Jungle = cats.filter(cat => cat.name === 'Jungle');

const handleGetRequest = (res, json) => {
  res.setHeader('Content-Type', 'application/json');

  return res.end(JSON.stringify(json));
};

const PORT = 3000;

createServer((req, res) => {
  const path = req.url;

  if (path === '/' || path === '/cats') {
    return handleGetRequest(res, cats);
  } else if (path.toLowerCase() === '/cats/biscuit') {
    return handleGetRequest(res, Biscuit);
  } else if (path.toLowerCase() === '/cats/jungle') {
    return handleGetRequest(res, Jungle);
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
}).listen(PORT, () =>
  console.log(`Web server is listening on port http://localhost:${PORT}...`)
);
