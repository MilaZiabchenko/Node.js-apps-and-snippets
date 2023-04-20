const fs = require('fs');
const { writeFile } = require('fs/promises');

const filePath = './lib/markdown/node-learning.md';

const mdText = `
	This is a Node Learning Markdown File
	==================

	ES6 Template Strings are cool. They honor whitespace.

	* Template Strings
	* Node File System
	* Readline CLIs
`;

const mdAdditionalText_1 = `
### Node learning is fun and awesome with Eve Porcello!
`;

const mdAdditionalText_2 = `
### Node learning is cool and creative with John Smilga!
`;

// writing/updating with a callback
fs.writeFile(filePath, mdText, err => {
  if (err) throw err;

  console.log('Markdown (re)created');

  fs.appendFileSync(filePath, mdAdditionalText_1);

  console.log('Markdown updated');
});

// writing/updating with a Promise
const updateFileContents = async path => {
  try {
    await writeFile(path, mdAdditionalText_2, {
      flag: 'a'
    });

    console.log('Markdown updated again');
  } catch (err) {
    console.error('There was an error:', error.message);
  }
};

updateFileContents(filePath);
