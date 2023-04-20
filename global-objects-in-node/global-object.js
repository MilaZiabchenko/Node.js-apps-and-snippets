// global object

for (const key_in_global_this in globalThis) {
  console.log({ key_in_global_this });
}

globalThis.favoriteNumber = 3;

console.log(globalThis.favoriteNumber);

// timers

const environment = `Node.js`;
const timer_1 = `setTimeout`;
const timer_2 = `setImmediate`;

const showMessage = (environment, timer) => {
  console.log(`${environment} ${timer} in action...`);
};

setTimeout(showMessage, 0, environment, timer_1);
setImmediate(showMessage, environment, timer_2);

let currentTime = 0;
const waitInterval = 700;
const waitTimeOut = 3500;

const incTime = () => {
  currentTime += waitInterval;

  const progressPercent = Math.floor((currentTime / waitTimeOut) * 100);

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(
    `Waiting ${currentTime} ms... ${progressPercent}% elapsed... `
  );
};

const interval = setInterval(incTime, waitInterval);

const timerFinished = () => {
  clearInterval(interval);

  console.log(`${waitTimeOut} ms ran out.`);
};

setTimeout(timerFinished, waitTimeOut);

// 'this'

// in Node.js 'this' keyword points to the current module it is being used in, i.e., the object exported via module.exports

console.log('this:', this);

module.exports.timeout = waitTimeOut;
module.exports.interval = waitInterval;

console.log('this:', this);

// objects specific to Node.js and available in all CommonJS modules:

console.log({ __dirname });
console.log({ __filename });
console.log({ module });
console.log({ exports });

// these variables may appear to be global, but they exist only in the scope of modules
