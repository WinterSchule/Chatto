const socket = io('/german'); // Connect to the german namespace

const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesubmit = document.getElementById('message-submit');
const namesubmit = document.getElementById('name-submit');
const nameform = document.getElementById('name-form');

// Initially hide the message form and submit button
messageInput.style.display = 'none';
messagesubmit.style.display = 'none';

// Handle connection event
socket.on('connect', () => {
    console.log('Connected to the german chat room');
});

// Set username function
let username = '';
function NameSubmitFunction() {
    username = nameform.value.trim();

    if (username === '') {
        username = "Anonymous";
    }
    // Limit username length to 30 characters
    if (username.length > 30) {
        username = username.substring(0, 30);
    }
    // Send the username to the server
    socket.emit('setUsername', username);

    // Hide name form and show message form
    nameform.style.display = 'none';    
    namesubmit.style.display = 'none';
    messageInput.style.display = 'initial';
    messagesubmit.style.display = 'initial';
}

// Execute NameSubmitFunction on button click
namesubmit.addEventListener('click', NameSubmitFunction);

// Execute NameSubmitFunction on Enter key press
let isusernameactivated = false;
document.addEventListener('keydown', function(event) {
    if (!isusernameactivated) {
        if (event.key === 'Enter') {
            NameSubmitFunction();
            isusernameactivated = true;     
        }
    }
});

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
    if (msg.trim() !== '') { // Check if the message is not empty
        socket.emit('chatMessage', username + ': ' + msg); // Emit the message to the server
        messageInput.value = ''; // Clear the input field
        messageInput.focus(); // Focus back on the input field
    }
});