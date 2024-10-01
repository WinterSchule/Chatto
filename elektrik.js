// Connect to the server
const socket = io();

// Specify the room for this chatroom (e.g., 'Programming')
const room = 'Elektrik'; // You can dynamically set this based on the chatroom
socket.emit('joinRoom', room);

// Display messages received from the server
const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

socket.on('message', (message) => {
    const p = document.createElement('p');
    p.textContent = message;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight; // Auto scroll to the bottom
});

// Send message to the server
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value;
    socket.emit('chatMessage', msg);
    messageInput.value = '';
    messageInput.focus();
});