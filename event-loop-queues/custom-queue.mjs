import logUpdate from 'log-update';

const delay = seconds =>
  new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });

const tasks = [
  delay(5),
  delay(3),
  delay(2),
  delay(10),
  delay(4),
  delay(6),
  delay(9),
  delay(7),
  delay(1),
  delay(8)
];

const toPlus = () => '+';

class PromiseQueue {
  constructor(promises = [], concurrentCount = 1) {
    this.concurrent = concurrentCount;
    this.todo = promises;
    this.running = [];
    this.complete = [];
  }

  get runAnother() {
    return this.running.length < this.concurrent && this.todo.length;
  }

  graphTasks() {
    const { todo, running, complete } = this;

    logUpdate(`
      todo: [${todo.map(toPlus)}],
      running: [${running.map(toPlus)}],
      complete: [${complete.map(toPlus)}]
    `);
  }

  run() {
    while (this.runAnother) {
      const promise = this.todo.shift();

      promise.then(() => {
        this.complete.push(this.running.shift());
        this.graphTasks();
        this.run();
      });

      this.running.push(promise);
      this.graphTasks();
    }
  }
}

const delayQueue = new PromiseQueue(tasks, 2);

delayQueue.run();
