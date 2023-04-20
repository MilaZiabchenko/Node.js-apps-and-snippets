import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

const messages = [];

wss.on('connection', ws => {
  console.log('New socket connected \n');

  ws.send('Welcome to Live Chat!');

  ws.on('message', message => {
    messages.push(message.toString());

    if (message.toString() === 'Exit') {
      ws.close();
    } else {
      wss.clients.forEach(client => client.send(message.toString()));
    }
  });

  ws.on('close', () => {
    console.log('User disconnected \n');
  });

  if (messages.length) {
    ws.send('Chat currently in session...');

    messages.forEach(message => ws.send(message.toString()));
  }
});

console.log('Chat server waiting for connections on ws://localhost:3000');
