import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

const messages = [];

wss.on('connection', ws => {
  ws.on('error', console.error);

  console.log('New socket connected \n');

  ws.send('Welcome to Live Chat!');

  ws.on('close', () => {
    console.log('User disconnected \n');
  });

  ws.on('message', message => {
    if (message.toString().trim().toLowerCase() === 'exit') {
      ws.close();
    } else {
      messages.push(message.toString());
      wss.clients.forEach(client => client.send(message.toString()));
    }
  });

  if (messages.length > 0) {
    ws.send('Chat currently in session...');
    messages.forEach(message => ws.send(message.toString()));
  }
});

console.log('Chat server waiting for connections on ws://localhost:3000');
