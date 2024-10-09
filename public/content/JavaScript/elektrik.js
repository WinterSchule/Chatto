const socket = io();

const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesubmit = document.getElementById('message-submit');
const namesubmit = document.getElementById('name-submit');
const nameform = document.getElementById('name-form');

messageInput.style.display = 'none';
messagesubmit.style.display = 'none';

let username = '';

function NameSubmitFunction() {
    username = nameform.value.trim();
    if (username === '') {
        alert('Please enter a valid username.');
        return;
    }

    // Send the username to the server
    socket.emit('setUsername', username);

    // Hide the name form and show the message input form
    nameform.style.display = 'none';
    namesubmit.style.display = 'none';
    messageInput.style.display = 'initial';
    messagesubmit.style.display = 'initial';
}

namesubmit.addEventListener('click', NameSubmitFunction);

// Display message from server
socket.on('message', (message) => {
    const p = document.createElement('p');

    // Style system messages
    if (message.system) {
        p.style.fontStyle = 'italic';
        p.style.color = 'gray';
    }

    // Set the actual message text
    p.textContent = message.text;

    // Append the message to the chat
    chat.appendChild(p);

    // Auto scroll to the bottom of the chat
    chat.scrollTop = chat.scrollHeight;
});

// Send message to server
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value;
    socket.emit('chatMessage', username + ': ' + msg);
    messageInput.value = '';
    messageInput.focus();
});
