const { createReadStream, createWriteStream, unlink } = require('fs');

const BASE_FL = './lib/chat-logs/george-ben-chat.log';
const FL_COPY = './george-ben-chat_0.log';
const FL_COPY_1 = './george-ben-chat_1.log';
const FL_COPY_2 = './george-ben-chat_2.log';
const FL_COPY_3 = './george-ben-chat_3.log';

const readStream = createReadStream(BASE_FL, 'utf8');
const writeStream = createWriteStream(FL_COPY, 'utf8');

// we can push data from the readable into the writable stream using write() or pipe() methods

// write()

readStream.on('data', chunk => createWriteStream(FL_COPY_1).write(chunk));

// pipe()

// the readable.pipe() method attaches a writable stream to the readable, causing it to switch automatically into flowing mode and push all of its data to the attached writable

readStream.pipe(createWriteStream(FL_COPY_2));
readStream.pipe(createWriteStream(FL_COPY_3));

readStream.on('open', () => {
  readStream.pipe(writeStream);
});
readStream.on('data', chunk => console.log(chunk));
readStream.on('error', err => console.error(err));
readStream.on('end', () => {
  writeStream.end('Goodbye');

  console.log('Reached end of the stream.');
});

const deleteFile = file => {
  unlink(file, err => {
    if (err) throw err;
  });

  console.log(`File '${file}' is deleted`);
};

setTimeout(() => deleteFile(FL_COPY_3), 5000);
setTimeout(() => deleteFile(FL_COPY_2), 10000);
setTimeout(() => deleteFile(FL_COPY_1), 15000);
process.on('exit', () => deleteFile(FL_COPY));
