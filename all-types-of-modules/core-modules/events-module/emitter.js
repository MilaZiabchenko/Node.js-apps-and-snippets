const EventEmitter = require('events');
const { admin, inc, getCount } = require('./counter');

inc();
inc();
inc();

// events

// a lot of built-in modules rely on the concept of events, and we can also set up our own custom events

// event emitter

// the event emitter is a pattern that allows us to create listeners for and then emit custom events

const emitter = new EventEmitter();

// the event emitter object exposes, among others, the on(), once() and emit() methods:

// on() method is used to associate a named event with a callback function (event handler) that's going to be executed when the event is triggered

// so, we pass it two arguments:

// 1 - the name for our custom event
// 2 - the callback function that can optionally have parameters

emitter.on('chat', (user, message) => {
  console.log(`${user}: ${message}`);
});

// once() method is used to register a listener that is called at most once for a particular event. Once the event is emitted, the listener is unregistered and then called

emitter.once('goodbye', user => {
  console.log(`Goodbye, ${user}!`);
});

emitter.once('wishes', () => {
  console.log(`Good luck and take care!`);
});

// emit() method is used to trigger a named event

// we pass arguments, if any, to the event handler
emitter.emit('chat', 'Terminal', `The count is ${getCount()}`);
emitter.emit('chat', `${admin}`, `That's what I expected`);

process.stdin.on('data', data => {
  const input = data.toString().trim();

  if (input.trim().toLowerCase() === 'exit') {
    emitter.emit('goodbye', admin);
    emitter.emit('wishes');

    process.exit();
  }

  emitter.emit('chat', admin, input);
});
 
// the event emitter is a powerful tool that allows us to decouple logic and handle asynchronicity in JavaScript
