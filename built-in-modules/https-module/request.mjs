import { request } from 'https';
import { writeFile } from 'fs';

const options = {
  port: 443,
  hostname: 'developer.mozilla.org',
  path: '/en-US/blog/welcome-to-the-MDN-blog/',
  method: 'GET',
};

request(options, res => {
  let responseBody = '';

  res.setEncoding('utf8');
  res.on('data', chunk => {
    console.log('---chunk', chunk.length);

    responseBody += chunk;
  });
  res.on('end', () => {
    writeFile('downloads/mdn-blog.html', responseBody, err => {
      if (err) throw err;

      console.log('File downloaded');
    });
  });
}).end();
