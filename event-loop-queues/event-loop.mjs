import { createReadStream } from 'fs';
import { stat } from 'fs/promises';

const fileName = './event-loop.js';

const readableStream = createReadStream(fileName);

readableStream.on('close', () =>
  console.log('This is from readableStream close event callback')
);

process.nextTick(() => console.log('Running at nextTick 1...'));
process.nextTick(() => {
  console.log('Running at nextTick 2...');

  process.nextTick(() =>
    console.log('This is the inner nextTick inside nextTick 2')
  );
});
process.nextTick(() => console.log('Running at nextTick 3...'));

Promise.resolve().then(() => console.log('Promise 1 resolved...'));
Promise.resolve().then(() => {
  console.log('Promise 2 resolved...');

  process.nextTick(() =>
    console.log(`This is the inner nextTick inside Promise 2 'then' block`)
  );
});
Promise.resolve().then(() => console.log('Promise 3 resolved...'));

setTimeout(() => console.log('Running at setTimeout with a 0 ms delay...'), 0);
setTimeout(() => {
  console.log('Running at setTimeout with a 500 ms delay...');

  process.nextTick(() =>
    console.log(
      'This is the inner nextTick inside setTimeout with a 500 ms delay'
    )
  );
}, 500);
setTimeout(() => {
  console.log('Running at setTimeout with a 1000 ms delay...');

  readableStream.close();
}, 1000);

try {
  const stats = await stat(fileName);

  console.log(`Reading '${fileName}'...`);

  if (stats.isFile()) {
    console.log(`The file size is ${stats.size}.`);
  }
} catch (err) {
  console.error(err.message);
}

setImmediate(() => console.log('Running at setImmediate 1...'));
setImmediate(() => {
  console.log('Running at setImmediate 2...');
  process.nextTick(() =>
    console.log('This is the inner nextTick inside setImmediate 2')
  );
  Promise.resolve().then(() =>
    console.log('Promise resolved inside setImmediate 2')
  );
});
setImmediate(() => console.log('Running at setImmediate 3...'));
