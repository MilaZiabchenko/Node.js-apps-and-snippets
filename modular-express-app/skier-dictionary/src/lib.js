import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const save = skiTerms => {
  fs.writeFile(
    path.join(__dirname, '..', 'data', 'ski-terms.json'),
    JSON.stringify(skiTerms, null, 2),
    err => {
      if (err) throw err;
    }
  );
};

const logger = (req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);

  if (Object.keys(req.body).length) {
    console.log(req.body);
  }

  next();
};

export { save, logger };
