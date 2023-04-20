const { createReadStream, createWriteStream, unlink } = require('fs');

const BASE_FILE = './lib/chat-logs/george-ben-chat.log';
const FILE_COPY = './lib/chat-logs/george-ben-chat-0.log';
const FILE_COPY_1 = './lib/chat-logs/george-ben-chat-1.log';
const FILE_COPY_2 = './lib/chat-logs/george-ben-chat-2.log';
const FILE_COPY_3 = './lib/chat-logs/george-ben-chat-3.log';

const readStream = createReadStream(BASE_FILE, 'utf8');
const writeStream = createWriteStream(FILE_COPY, 'utf8');

// we can push data from the readable into the writable stream using write() or pipe() methods

// write()

readStream.on('data', chunk => createWriteStream(FILE_COPY_1).write(chunk));

// pipe()

// when the pipe() method is called on the file stream, it takes the source, and pipes it into a destination

// the readable.pipe() method attaches a writable stream to the readable, causing it to switch automatically into FILEowing mode and push all of its data to the attached writable

readStream.pipe(createWriteStream(FILE_COPY_2));
readStream.pipe(createWriteStream(FILE_COPY_3));

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

setTimeout(() => deleteFile(FILE_COPY_3), 5000);
setTimeout(() => deleteFile(FILE_COPY_2), 10000);
setTimeout(() => deleteFile(FILE_COPY_1), 15000);

process.on('exit', () => deleteFile(FILE_COPY));
