// server.js
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const KEY_VALUE = 'mypassword'; // The key value to send

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  // Send the key value every 5 seconds
  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ key: KEY_VALUE }));
      console.log('Key send');
    }
  }, 5000);

  ws.on('close', () => {
    clearInterval(intervalId);
    console.log('WebSocket connection closed');
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});
