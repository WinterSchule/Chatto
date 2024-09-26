
const socket = io();


const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');


let username = document.getElementById('usernameselect').value; 

// Display message from server
    socket.on('message', function(message) {
    var p = document.createElement('p');
    p.textContent = message;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight; // Auto scroll to the bottom
});

// Send message to server
    messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let message = messageInput.value.trim();
    
    // Fügen Sie den Benutzernamen hinzu, wenn er nicht vorhanden ist
    if (!message.includes(username)) {
        message = username + ": " + message;
    }
    
    socket.emit('chatMessage', message);
    messageInput.value = '';
    messageInput.focus();
});

