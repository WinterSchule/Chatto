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
    username = nameform.value;
    //Wenn Name-Submit-Button gedrückt dann wird das Textfeld und der Button ausgeblendet
    nameform.style.display = 'none';
    namesubmit.style.display = 'none';
    //Danach wird das Message Textfeld angezeigt 
    messageInput.style.display = 'initial';
    messagesubmit.style.display = 'initial';

}

namesubmit.addEventListener('click', NameSubmitFunction);

// Display message from server
socket.on('message', (message) => {
    const p = document.createElement('p');
    p.textContent = message;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight; // Auto scroll to the bottom
});


// Send message to server
messageForm.addEventListener('submit', (e) => {
    //Verhindert das die Seite neu geladen wird
    e.preventDefault();
    const msg = messageInput.value;
    socket.emit('chatMessage', username + ': ' + msg);
    messageInput.value = '';
    messageInput.focus();

});

