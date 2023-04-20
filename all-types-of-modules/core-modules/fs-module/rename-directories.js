const fs = require('fs');

const DIR_1 = './lib/accounts';
const DIR_2 = './lib/library';
const DIR_3 = './lib/markdown';
const DIR_4 = './lib/md';

// rename empty directory
if (fs.existsSync(DIR_1)) {
  fs.renameSync(DIR_1, DIR_2);

  console.log(`Empty directory 'accounts' renamed to 'library'`);
} else if (fs.existsSync(DIR_2)) {
  fs.renameSync(DIR_2, DIR_1);

  console.log(`Empty directory 'library' renamed to 'accounts'`);
}

// rename directory with files
if (fs.existsSync(DIR_3)) {
  fs.mkdirSync(DIR_4);

  fs.readdirSync(DIR_3).forEach(file => {
    fs.renameSync(`${DIR_3}/${file}`, `${DIR_4}/${file}`);
  });

  fs.rmdirSync(DIR_3);

  console.log(`Directory with files 'markdown' renamed to 'md'`);
} else if (fs.existsSync(DIR_4)) {
  fs.mkdirSync(DIR_3);

  fs.readdirSync(DIR_4).forEach(file => {
    fs.renameSync(`${DIR_4}/${file}`, `${DIR_3}/${file}`);
  });

  fs.rmdirSync(DIR_4);

  console.log(`Folder with files 'md' renamed to 'markdown'`);
}
