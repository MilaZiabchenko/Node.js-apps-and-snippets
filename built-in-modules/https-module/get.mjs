import { get } from 'https';
import { createWriteStream } from 'fs';

const url =
  'https://www.nationalgeographic.com/magazine/article/what-are-animals-thinking-feature';
const stream = createWriteStream('downloads/animals-thinking.html');

const request = get(url, res => {
  console.log('Response started!');

  res.pipe(stream);
  res.on('end', () => {
    console.log('Response finished!');
  });
});

request.end();
