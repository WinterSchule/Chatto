const socket = io('/elektrik'); // Connect to the elektrik namespace

const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesubmit = document.getElementById('message-submit');
const namesubmit = document.getElementById('name-submit');
const nameform = document.getElementById('name-form');

//messageForm und messagesubmit werden anfangs ausgeblendet 
messageInput.style.display = 'none';
messagesubmit.style.display = 'none';

socket.on('connect', () => {
    console.log('Connected to the chat room');
});

let username = '';
let AnonymousCounter = 1;
//Der Inhalt des Nachrichten-Textfelds wird zum Username
function NameSubmitFunction() {
    
    username = nameform.value.trim();

    if (username === '') {
        username = "Anonymous";
    }
    //limitiert die Länge des Usernames auf 30 Zeichen
    if (username.length > 30) {
        username = username.substring(0, 30);
    }
    // Send the username to the server
    socket.emit('setUsername', username);

    //Name-Form und submit werden ausgeblendet und Message-form und submit werden eingeblendet
    nameform.style.display = 'none';    
    namesubmit.style.display = 'none';
    messageInput.style.display = 'initial';
    messagesubmit.style.display = 'initial';
}
//Die NameSubmitFunction wird mit den Mausklick ausgeführt 
namesubmit.addEventListener('click', NameSubmitFunction);

//Die NameSubmitFunction wird mit der Enter-Taste ausgeführt 
let isusernameactivated = false;
document.addEventListener('keydown', function(event) {
if (isusernameactivated !== true) {
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
    socket.emit('chatMessage', username + ': ' + msg);
    messageInput.value = '';
    messageInput.focus();
});
