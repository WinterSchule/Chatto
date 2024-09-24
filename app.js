const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle connection event
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  // Listen for chatMessage event from client
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg); // Broadcast message to all clients
  });

  // Run when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
