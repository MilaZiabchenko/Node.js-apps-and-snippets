import os from 'os';
import cluster from 'cluster';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

console.log(`Primary pid=${process.pid}`);

const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);

const __dirname = dirname(fileURLToPath(import.meta.url));

cluster.setupPrimary({
  exec: __dirname + '/index.js'
});

for (let i = 0; i < cpuCount; i++) {
  cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} has been killed`);
  console.log('Starting another worker...');

  cluster.fork();
});
