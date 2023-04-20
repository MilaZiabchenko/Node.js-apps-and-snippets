const path = require('path');

const currentPathInfo = {
  abs_path_dirname: __dirname,
  dir_basename: path.basename(__dirname),
  abs_path_filename: __filename,
  file_basename: path.basename(__filename)
};

console.log({ currentPathInfo });
console.log({ abs_path_dirname: path.dirname(__filename) });
console.log({ path_separator: path.sep });

const normalizedPath = path.join(__dirname, 'www', 'files', 'uploads');
const absolutePath = path.resolve(__dirname, 'www', 'files', 'uploads');

console.log({ normalizedPath });
console.log({ absolutePath });
