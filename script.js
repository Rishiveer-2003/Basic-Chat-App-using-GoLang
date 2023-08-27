const chatDiv = document.getElementById('chat');
const messageForm = document.getElementById('messageForm');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');

const socket = new WebSocket('ws://localhost:8080/ws');

socket.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.textContent = `${msg.username}: ${msg.content}`;
    chatDiv.appendChild(messageElement);
    chatDiv.scrollTop = chatDiv.scrollHeight;
});

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const content = messageInput.value;
    const message = {
        username: username,
        content: content
    };
    socket.send(JSON.stringify(message));
    messageInput.value = '';
});
