import { stat } from 'fs/promises';

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

setImmediate(() => console.log('Running at setImmediate...'));

setTimeout(
  () => console.log('Running at setTimeout with a 1000 ms delay...'),
  1000
);
setTimeout(() => {
  console.log('Running at setTimeout with a 500 ms delay...');

  process.nextTick(() =>
    console.log(
      'This is the inner nextTick inside setTimeout with a 500 ms delay'
    )
  );
}, 500);
setTimeout(() => console.log('Running at setTimeout with a 0 ms delay...'), 0);

const fileName = './event-loop.js';

try {
  const stats = await stat(fileName);

  console.log(`Reading '${fileName}'...`);

  if (stats.isFile()) {
    console.log(`The file size is ${stats.size}.`);
  }
} catch (err) {
  console.error(err.message);
}
