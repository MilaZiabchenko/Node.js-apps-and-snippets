// Modules

// a concept of modules is a way to define functions in one file and use them in another

// in Node.js every file is module (by default)

// module is an empty object to begin with

// modules are encapsulated code (only share minimum)

const myName = 'Mila';

const personality = {
  name: 'Leo',
  getName() {
    return this.name;
  }
};

const sayHey = name => `Hey, ${name}!`;
const sayBye = name => `Bye, ${name}!`;
const greetEveryone = () => `Hey, everyone!`;

const secretInfo = 'This info is private and not shared';

// module contains info about current module. It shares only what is exported

// default exports
module.exports = personality;

// named exports
module.exports = { myName, sayHey, sayBye, greetEveryone };
module.exports.ourNames = [
  personality.getName(),
  personality.getName.call({ name: myName })
];

console.log(module);
console.log(module.exports);
