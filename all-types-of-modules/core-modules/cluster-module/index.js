import express from 'express';

const app = express();

app.get('/heavy', (req, res) => {
  let total = 0;

  for (let i = 0; i < 5_000_000_000; i++) {
    total++;
  }

  res.send(`The result of the CPU intensive task is ${total}\n`);
});

console.log(`Worker pid=${process.pid}`);

const port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
