const { rl, collectAnswers } = require('./collect-answers');

const questions = [
  'What is your name?',
  'What is your city name?',
  'What are you going to do with Node.js?'
];

const questionsAnswered = collectAnswers(questions, answers => {
  const [name, city, plansWithNode] = answers;

  console.log(`Thank you for your answers, ${name} from ${city}!`);

  rl.question(`One more question: how do you like Node? > `, lastAnswer => {
    console.log(
      `Thanks for your answer "${lastAnswer}"! ${plansWithNode} with Node.js, ${name}! Good luck!`
    );

    process.exit();
  });
});

questionsAnswered.on('answer', answer =>
  console.log(`Your answer is "${answer}"`)
);
