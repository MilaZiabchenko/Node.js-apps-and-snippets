# Event Loop

The event loop is a loop that runs as long as your Node.js application is up and running. There are six different queues in every loop, each holding one or more callback functions that need to be executed on the call stack eventually. Within the event loop, the sequence of execution follows certain rules.

## The following is the priority order of the queues with CommonJS module format:

1. nextTick queue, which holds callbacks associated with the process.nextTick().
2. Promise queue, which holds callbacks associated with the native Promise in JavaScript.
3. timer queue, which holds callbacks associated with setTimeout() and setInterval().
4. I/O queue, which contains callbacks associated with the async methods from the built-in Node.js modules such as methods associated with the fs and http modules.
5. check queue, which holds callbacks associated with the setImmediate() function, which is specific to Node.
6. close queue, which holds callbacks associated with the close event of an async task.

The nextTick queue and the Promise queue are microtask queues. They have the highest priority when it comes to executing asynchronous code in Node.js, and execute as soon as the call stack is empty.

The timer, I/O, check, and close queues have the lowest priority. These queues are all part of libuv, a cross-platform open-source library written in C, which provides support for handling asynchronous operations.

After executing each callback in the timer queue, the event loop goes back and checks the microtask queues. If it identifies a new callback that needs to be executed, this callback is dequeued and executed on the call stack. Now that the microtask queues are empty, the control goes back to the timer queue. The same rule applies to I/O, check, and close queues in their turn.

When running setTimeout() with a delay of 0ms and an I/O async method or a check queue callback, the order of execution can never be guaranteed. This is because when we set a 0 millisecond delay, it is overwritten to a 1 millisecond delay by Node.js. At the start of the event loop, Node.js needs to determine if the 1ms timer has elapsed or not. If the event loop enters the timer queue at, say, 0.05ms and the 1ms callback hasn't been queued, control moves on to the I/O queue, executing the I/O async callback, then to the check queue, and so on... In this case, the timer queue callback will be executed in the next iteration of the event loop. So, when running setTimeout() with a 0 millisecond delay and an I/O async method, the order of execution depends on how busy the CPU is.

I/O events are polled and callback functions are added to the I/O queue only after the I/O is complete - this can sometimes result in check queue callbacks being executed before I/O queue callbacks. However, when both queues contain callback functions, the callbacks in the I/O queue always take priority and run first.