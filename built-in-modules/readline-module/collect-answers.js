const { createInterface } = require('readline');
const { EventEmitter } = require('events');

// readline

// readline module allows us to ask questions of our terminal user. It's a wrapper around the standard input/standard output process that allows us to easily control the user prompt without having to work directly with stdin and stdout

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const collectAnswers = (questions, done) => {
  const answers = [];
  const [firstQuestion] = questions;

  const emitter = new EventEmitter();

  const questionAnswered = answer => {
    emitter.emit('answer', answer);
    answers.push(answer.trim());

    if (answers.length < questions.length) {
      rl.question(`${questions[answers.length]} > `, questionAnswered);
    } else {
      return done(answers);
    }
  };

  rl.question(`${firstQuestion} > `, questionAnswered);

  return emitter;
};

module.exports = {
  rl,
  collectAnswers,
};
