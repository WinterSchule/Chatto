 const socket = io();

        const chat = document.getElementById('chat');
        const messageForm = document.getElementById('message-form');
        const messageInput = document.getElementById('message-input');

        // Display message from server
        socket.on('message', (message) => {
            const p = document.createElement('p');
            p.textContent = message;
            chat.appendChild(p);
            chat.scrollTop = chat.scrollHeight; // Auto scroll to the bottom
        });

        // Send message to server
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = messageInput.value;
            socket.emit('chatMessage', msg);
            messageInput.value = '';
            messageInput.focus();
        });
