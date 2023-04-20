const fs = require('fs');
const { writeFile } = require('fs/promises');

const filePath = './lib/markdown/node-learning.md';

const mdText = `
    This is a Node.js Learning Markdown File
    ==================

    Today we are going to cover the following topics:

    - Node File System
    - Readline CLIs
    - Streams
`;

const mdAdditionalText_1 = `\n\n*Learning Node is fun and creative with **Eve Porcello**!*`;
const mdAdditionalText_2 = `\n\n_Learning Node is also awesome with **John Smilga** — he explains everything in great detail!_`;

// writing/updating with a callback pattern
fs.writeFile(filePath, mdText, err => {
  if (err) throw err;

  console.log('Markdown (re)created');

  fs.appendFileSync(filePath, mdAdditionalText_2);

  console.log('Markdown updated using a callback');
});

// writing/updating with a Promise pattern
const updateFileContents = async path => {
  try {
    await writeFile(path, mdAdditionalText_1, {
      flag: 'a'
    });

    console.log('Markdown updated using a Promise');
  } catch (err) {
    console.error('There was an error:', error.message);
  }
};

updateFileContents(filePath);
