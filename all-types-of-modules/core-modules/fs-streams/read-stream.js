const fs = require('fs');

fs.readFile('./lib/chat-logs/george-ben-chat.log', 'utf8', (err, chatLog) => {
  if (err) throw err;

  console.log(`File read, chat log length: ${chatLog.length} bytes.`);
});

console.log('Reading the file...');

// why streams?

// fs.readFile() waits until the entire file is read into memory before invoking the callback function. If we are reading a huge file, it is going to create some latency. So, a better solution might be to use a readable stream

// streams give us a way to asynchronously handle continuous data flows by reading/writing input into output sequentially

// streams are a way to handle reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way. Streams read chunks of data piece by piece, processing its content without keeping it all in memory

// this makes streams really powerful when working with large amounts of data, for example, a file size can be larger than your free memory space, making it impossible to read the whole file into the memory in order to process it. That’s where streams come to the rescue!

// readable stream

const stream = fs.createReadStream('./lib/chat-logs/george-ben-chat.log', {
  highWaterMark: 999,
  encoding: 'utf8'
});

// once we created an instance of the stream, we have access to the events

// instead of reading an entire file at once, a stream breaks the file down into buffers, or bits, or chunks. Readable streams raise 'data' events and pass small chunks of data (64kb by default) to the callback. So, we are not having to wait for an entire file before the first data chunk will log

let data = '';

stream.on('error', err => console.error(err));

stream.once('data', chunk => {
  console.log(`Readable stream started...`);
  console.log(chunk);
});

stream.on('data', chunk => {
  console.log(`Received ${chunk.length} bytes of data.`);

  data += chunk;
});

stream.on('end', () => {
  console.log(`Readable stream finished.`);
});

// using streams, we don't have to wait for the entire file to finish loading before we start reading the data. Streaming video or audio is a perfect example of this. When we watch or listen to it online, we can start doing it before the entire video or audio is downloaded. Instead, the browser receives the data as a continuous flow of chunks, allowing the recipients to start watching and/or listening almost immediately. So, we can enjoy the first part while the rest is still being delivered

// streams basically provide two major advantages compared to other data handling methods:

// 1. memory efficiency:

// you don’t need to load large amounts of data in memory before you are able to process it

// 2. time efficiency:

// it takes significantly less time to start processing data as soon as you have it, rather than having to wait with processing until the entire payload has been transmitted
