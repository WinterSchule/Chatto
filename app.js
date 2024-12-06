const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Create namespaces for different chat rooms
const elektrikRoom = io.of('/elektrik');
const programmingRoom = io.of('/programming');
const networkingRoom = io.of('/networking');
const sportRoom = io.of('/sport');
const animalRoom = io.of('/animal');
const musicRoom = io.of('/music');
const mathRoom = io.of('/math');
const germanRoom = io.of('/german');
const englishRoom = io.of('/english');
const gamesRoom = io.of('/games');

// Serve the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to handle room connections
function handleRoomConnection(room) {
  const users = {}; // Object to store users for this room

  room.on('connection', (socket) => {
    console.log(`A user connected to the ${room.name} room`);

    socket.on('setUsername', (username) => {
      users[socket.id] = username; // Associate the username with the socket ID
      console.log(`${username} joined the ${room.name} room`);

      // Broadcast a system message that a user joined
      socket.broadcast.emit('message', { text: `${username} has joined the ${room.name.substring(1)} room`, system: true });
    });

    socket.on('chatMessage', (msg) => {
      room.emit('message', { text: msg, system: false }); // Broadcast the regular chat message
    });

    socket.on('disconnect', () => {
      const username = users[socket.id]; // Retrieve the username of the disconnected user
      if (username) {
        console.log(`${username} left the ${room.name} room`);
        room.emit('message', { text: `${username} has left the ${room.name.substring(1)} room`, system: true });
        delete users[socket.id]; // Remove the user from the list
      }
    });
  });
}

// Handle connections for each room
handleRoomConnection(programmingRoom);
handleRoomConnection(elektrikRoom);
handleRoomConnection(networkingRoom);
handleRoomConnection(sportRoom);
handleRoomConnection(animalRoom);
handleRoomConnection(musicRoom);
handleRoomConnection(mathRoom);
handleRoomConnection(germanRoom);
handleRoomConnection(englishRoom);
handleRoomConnection(gamesRoom);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});