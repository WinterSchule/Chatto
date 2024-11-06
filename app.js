const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = {};  // Object to store users with their socket ID

// Serve the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // When a user connects but has no username yet, we wait for their name submission
  socket.on('setUsername', (username) => {
    users[socket.id] = username; // Associate the username with the socket ID
    console.log(`${username} joined`);

    // Broadcast a system message that a user joined
    socket.broadcast.emit('message', { text: `${username} has joined the chat`, system: true });
  });

  // Listen for chatMessage event from client
  socket.on('chatMessage', (msg) => {
    io.emit('message', { text: msg, system: false }); // Broadcast the regular chat message
  });

  // Run when client disconnects (only emit message if the user exists)
  socket.on('disconnect', () => {
    const username = users[socket.id]; // Retrieve the username of the disconnected user
    if (username) {
      console.log(`${username} left`);
      io.emit('message', { text: `${username} has left the chat`, system: true });
      delete users[socket.id]; // Remove the user from the list
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
