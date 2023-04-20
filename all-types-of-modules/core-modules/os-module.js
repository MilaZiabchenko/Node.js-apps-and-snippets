const os = require('os');

const OS_Info = {
  type: os.type(),
  release: os.release(),
  architecture: os.arch(),
  platform: os.platform(),
  homedir: os.homedir(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
  cpuCount: os.cpus().length
};

const CPU_Info = os.cpus();

console.log({ OS_Info });
console.log({ CPU_Info });
console.log(`The System Uptime is ${os.uptime()} seconds.`);
