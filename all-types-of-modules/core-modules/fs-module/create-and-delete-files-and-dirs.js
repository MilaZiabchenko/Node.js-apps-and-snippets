const fs = require('fs');

if (fs.existsSync('./new-module.js')) {
  fs.unlink('./new-module.js', err => {
    if (err) throw err;

    console.log('File deleted');
  });
} else {
  fs.writeFile('./new-module.js', `const name = 'Mila';`, err => {
    if (err) throw err;

    console.log('File created');
  });

  fs.readFile('./new-module.js', (err, data) => {
    if (err) throw err;

    console.log(data.toString());
  });
}

if (!fs.existsSync('./modules')) {
  fs.mkdir('./modules', err => {
    if (err) throw err;

    console.log('Directory created');
  });
} else {
  fs.rmdir('./modules', err => {
    if (err) throw err;

    console.log('Directory deleted');
  });
}
