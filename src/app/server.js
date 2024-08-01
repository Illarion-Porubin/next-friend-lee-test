
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let KEY_VALUE = ''; 

// Middleware to handle CORS
app.use(cors({
  origin: 'http://localhost:3000', 
  allowedHeaders: ['Content-Type']
}));

// Middleware to parse JSON
app.use(express.json());

// Update the key
app.post('/update-key', (req, res) => {
  const { key } = req.body;
  if (key !== undefined) {
    KEY_VALUE = key;
    res.status(200).json({ message: 'Key updated successfully' });
  } else {
    res.status(400).json({ error: 'Key is missing' });
  }
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ key: KEY_VALUE }));
      console.log('Key sent:', KEY_VALUE);
    }
  }, 5000);

  ws.on('close', () => {
    clearInterval(intervalId);
    console.log('WebSocket connection closed');
  });
});

server.listen(8080, () => {
  console.log(`WebSocket server is running on ws://localhost:8080`);
});
