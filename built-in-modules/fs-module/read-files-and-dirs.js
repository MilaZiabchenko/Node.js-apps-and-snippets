const fs = require('fs');
const util = require('util');

const filePath = './../events-module/counter.js';

// blocking
const fileContents = fs.readFileSync(filePath, 'utf8');

console.log(fileContents);
console.log(`Reading file synchronously...`);

const dirFiles = fs.readdirSync('./');

console.log(dirFiles);
console.log(`Reading directory synchronously...`);

// non-blocking
const readFileContentsPromise_1 = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

readFileContentsPromise_1(filePath)
  .then(fileContents => console.log(fileContents))
  .catch(err => console.error(err));

console.log(`Reading file asynchronously...`);

const readFileContentsPromise_2 = util.promisify(fs.readFile);

const logFileContents = async path => {
  try {
    const fileContents = await readFileContentsPromise_2(path, 'utf8');

    console.log(fileContents);
  } catch (error) {
    console.error(error);
  }
};

logFileContents(filePath);

console.log(`Reading file asynchronously...`);

fs.readdir('./', (err, files) => {
  if (err) throw err;

  console.log(files);
});

console.log(`Reading directory asynchronously...`);
