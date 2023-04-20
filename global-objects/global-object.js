// global object

for (const key_in_global_this in globalThis) {
  console.log({ key_in_global_this });
}

globalThis.favoriteNumber = 3;

console.log(globalThis.favoriteNumber);

// timers

const topic = `Node.js timers`;

const showMessage = topic => {
  console.log(`${topic} in action...`);
};

setImmediate(showMessage, topic);

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
