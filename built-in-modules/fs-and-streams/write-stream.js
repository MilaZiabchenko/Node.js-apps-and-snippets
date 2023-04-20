const fs = require('fs');

// writeable stream

// the writeable stream is used to write the data chunks that are being read by the readable streams

let answerStream;

const questions = [
  'What is your name?',
  'What would you rather be doing?',
  'What is your preferred programming language?',
];
const answers = [];

const ask = (i = 0) => {
  process.stdout.write(`${questions[i]} > `);
};

ask();

const createMd = data => {
  const name = data.toString().trim();
  const fileName = `./lib/markdown/questionnaire.md`;

  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }

  answerStream = fs.createWriteStream(fileName);
  answerStream.write(`Questions & Answers for ${name}\n============\n`);
};

const getAnswers = data => {
  const answer = data.toString().trim();

  answerStream.write(`Question: ${questions[answers.length]}\n`);
  answerStream.write(`Answer: ${answer}\n\n`, () => {
    if (answers.length < questions.length) {
      ask(answers.length);
    } else {
      process.exit();
    }
  });

  answers.push(answer);
};

const getRecommendation = () => {
  answerStream.close();
  process.stdout.write(`\n`);
  process.stdout.write(
    `Go ${answers[1]}, ${answers[0]}! You can finish writing ${answers[2]} later :) \n`
  );
};

process.stdin.once('data', createMd);
process.stdin.on('data', getAnswers);
process.on('exit', getRecommendation);
