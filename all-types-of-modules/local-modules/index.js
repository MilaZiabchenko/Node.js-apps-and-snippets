// when Node.js exports a module, it wraps it in a function, so when we import a module, we actually invoke it

// default import
const ourModule = require('./our-module');
// named import
const { greetEveryone, sayHey, sayBye, ourNames } = require('./our-module');

console.log(greetEveryone());
console.log(sayHey(ourNames.at(0)));
console.log(sayHey(ourModule.myName));
console.log(sayBye(ourNames.at(1)));
console.log(sayBye('Everyone'));
