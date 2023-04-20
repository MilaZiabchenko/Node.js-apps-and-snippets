const fs = require('fs');

const filePath_1 = './lib/config.js';
const filePath_2 = './lib/project-config.js';

if (fs.existsSync(filePath_1)) {
  fs.rename(filePath_1, filePath_2, err => {
    if (err) throw err;

    console.log(`File ${filePath_1} is renamed to ${filePath_2}`);
  });
}

if (fs.existsSync(filePath_2)) {
  fs.rename(filePath_2, filePath_1, err => {
    if (err) throw err;

    console.log(`File ${filePath_2} is renamed to ${filePath_1}.`);
  });
}

const filePath_3 = './lib/markdown/notes.md';
const filePath_4 = './lib/markdown/my-notes.md';

const md = `
# Notes

These are my Node.js notes...
`;

if (!fs.existsSync(filePath_3) && !fs.existsSync(filePath_4)) {
  fs.writeFile(filePath_3, md, err => {
    if (err) throw err;

    console.log(`File ${filePath_3} is created.`);
  });
} else if (fs.existsSync(filePath_3)) {
  fs.rename(filePath_3, filePath_4, err => {
    if (err) throw err;

    console.log(`File ${filePath_3} is renamed to ${filePath_4}.`);
  });
} else if (fs.existsSync(filePath_4)) {
  fs.unlink(filePath_4, err => {
    if (err) throw err;

    console.log(`File ${filePath_4} is deleted.`);
  });
}
