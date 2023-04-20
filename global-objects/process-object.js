// process object

// process object is available globally and can be accessed from anywhere. It gives us info about env where the program is being executed and contains functionality that allows us to interact with the current process instance

console.log(process.env.HOSTNAME);
console.log(process.platform);
console.log(process.memoryUsage());

// with the process object we can read environment variables, communicate with the terminal, or exit the current process

// process.argv array stores command-line arguments

console.log(process.argv);

const grabValueAfterFlag = flag => {
  const indexAfterFlag = process.argv.indexOf(flag) + 1;

  return process.argv[indexAfterFlag];
};

const greeting = grabValueAfterFlag('--greeting');
const coder = grabValueAfterFlag('--nodeLearner');

// process.stdin (readable stream)

// process.stdout (writable stream)

// stdin and stdout objects implement the stream interface, and offer us a way to communicate with the process while it is running

process.stdout.write(`${greeting}, ${coder}! \n\n`);
process.stdout.write(`Hey there, Node.js! \n\n`);

const questions = [
  'What is your name?',
  'What would you rather be doing?',
  'What is your preferred programming language?'
];
const answers = [];

const ask = (i = 0) => {
  process.stdout.write(`${questions[i]} > `);
};

ask();

const getAnswers = data => {
  answers.push(data.toString().trim());

  if (answers.length < questions.length) {
    ask(answers.length);
  } else {
    process.exit();
  }
};

const getRecommendation = () => {
  process.stdout.write(`\n`);
  process.stdout.write(
    `Go ${answers[1]}, ${answers[0]}! You can finish writing ${answers[2]} later :) \n`
  );
};

process.stdin.on('data', getAnswers);
process.on('exit', getRecommendation);
