// built-in modules

// built-in modules are installed locally with the installation of Node.js, and we use the require function to load them

const os = require('os');

const user = os.userInfo();
const currentOS = {
  type: os.type(),
  release: os.release(),
  platform: os.platform(),
  homedir: os.homedir(),
  totalMem: os.totalmem(),
  freeMem: os.freemem()
};

console.log({ user });
console.log({ currentOS });
console.log(`The System Uptime is ${os.uptime()} seconds.`);
