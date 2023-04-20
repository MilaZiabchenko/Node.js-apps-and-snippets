const fs = require('fs');
const { promisify } = require('util');
const { readdir } = require('fs/promises');

const filePath = './lib/markdown/notes.md';

// blocking
const fileContents = fs.readFileSync(filePath, 'utf8');

console.log(fileContents);
console.log(`Reading file synchronously...`);

const dirFiles = fs.readdirSync('./');

console.log(dirFiles);
console.log(`Reading directory synchronously...`);

// non-blocking
const readFile_1 = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, fileContents) => {
      err ? reject(err) : resolve(fileContents);
    });
  });

readFile_1(filePath)
  .then(fileContents => console.log(fileContents))
  .catch(err => console.error(err.message));

console.log(`Reading file asynchronously...`);

const readFile_2 = promisify(fs.readFile);

const logFileContents = async path => {
  try {
    const fileContents = await readFile_2(path, 'utf8');

    console.log(fileContents);
  } catch (error) {
    console.error(error.message);
  }
};

logFileContents(filePath);

console.log(`Reading file asynchronously...`);

fs.readdir('./', (err, files) => {
  if (err) throw err;

  console.log(files);
});

console.log(`Reading directory asynchronously...`);

const logCurrentDirectoryFiles = async () => {
  try {
    const files = await readdir(__dirname);

    console.log(files);
  } catch (err) {
    console.error(err.message);
  }
};

logCurrentDirectoryFiles();

console.log(`Reading directory asynchronously...`);
