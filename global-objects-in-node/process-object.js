// process

// when we run a Node program on a system, it creates a process that uses only one CPU to execute by default even when there is a system with multiple CPUs. Since Node uses a single thread to execute JavaScript code, all the requests to the application have to be handled by that thread running on a single CPU

// when we run a file with the 'node' command, the operating system (OS) creates a process for a running program. The OS allocates memory for the program and creates an entry in a process list containing all OS processes. That entry is a process ID

console.log(`process id = ${process.pid}`);

// the program binary is then located and loaded into the memory allocated to the process. From there, it starts executing

console.log(`process total memory = ${process.memoryUsage().heapTotal}`);
console.log(`process memory usage = ${process.memoryUsage().heapUsed}`);

// process object

// process object is available globally and can be accessed from anywhere. It gives us info about environment where the program is being executed and contains functionality that allows us to interact with the current process instance. With the process object we can read environment variables, communicate with the terminal, and exit the current process

const processInfo = {
  hostname: process.env.HOSTNAME,
  platform: process.platform,
  execPath: process.argv0
};

console.log({ processInfo });

// process.argv

// process.argv array stores command-line arguments: execution path (process.argv[0]), absolute path to the file (process.argv[1]) + any additional arguments, passed when the process is launched

console.log(process.argv);

const grabValueAfterFlag = flag => {
  const indexAfterFlag = process.argv.indexOf(flag) + 1;

  return process.argv[indexAfterFlag];
};

const greeting = grabValueAfterFlag('--greeting');
const learner = grabValueAfterFlag('--nodeLearner');

// process.stdin (readable stream)

// process.stdout (writable stream)

// stdin and stdout objects implement the stream interface, and offer us a way to communicate with the process while it is running

if (process.argv.length === 6) {
  process.stdout.write(`\n${greeting}, ${learner}!\n`);
  process.stdout.write(`Greetings from Node.js!\n\n`);
} else {
  console.error('Error: this program requires 6 arguments!');

  return;
}

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
  const [name, activity, language] = answers;

  process.stdout.write(
    `\nGo ${activity}, ${name}! You can finish writing ${language} later =)\n`
  );
};

process.stdin.on('data', getAnswers);
process.on('exit', getRecommendation);
