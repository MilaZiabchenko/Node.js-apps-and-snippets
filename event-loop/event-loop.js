const { stat } = require('fs');

// event loop

// the event loop is a loop that runs as long as your Node.js application is up and running. There are six different queues in every loop, each holding one or more callback functions that need to be executed on the call stack eventually. Within the event loop, the sequence of execution follows certain rules.

// the following is the priority order of the queues with CommonJS module format:

// 1. nextTick queue, which holds callbacks associated with the process.nextTick function.
// 2. Promise queue, which holds callbacks associated with the native Promise in JavaScript.
// 3. timer queue, which holds callbacks associated with setTimeout() and setInterval().
// 4. I/O queue, which contains callbacks associated with all the async methods such as methods associated with the fs and http modules.
// 5. check queue, which holds callbacks associated with the setImmediate() function, which is specific to Node.
// 6. close queue, which holds callbacks associated with the close event of an async task.

// the nextTick queue and the Promise queue are microtask queues. They have the highest priority when it comes to executing asynchronous code in Node.js, and execute as soon as the call stack is empty.

// the timer, I/O, check, and close queues have the lowest priority. These queues are all part of libuv, a cross-platform open-source library written in C, which provides support for handling asynchronous operations.

// after executing each callback in the timer queue, the event loop goes back and checks the microtask queues. If it identifies a new callback that needs to be executed, this callback is dequeued and executed on the call stack. Now that the microtask queues are empty, the control goes back to the timer queue. The same rule applies to I/O, check, and close queues in their turn

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

const fileName = './event-loop.mjs';

stat(fileName, (err, stats) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Reading '${fileName}'...`);

    if (stats.isFile()) {
      console.log(`The file size is ${stats.size}.`);
    }
  }
});
