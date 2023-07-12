const socket = io.connect('http://localhost:3000');


// Select elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatContainer = document.getElementById('chatContainer');

// Event listener for send button click
sendButton.addEventListener('click', function () {
	const message = messageInput.value;
	if (message.trim() !== '') {
		socket.emit('chat message', { text: message });
		messageInput.value = '';
	}
});

// Event listener for receiving chat messages
socket.on('chat message', function (message) {
	appendMessage(message);
});

// Function to append a new message to the chat window
function appendMessage(message) {
	const messageElement = document.createElement('div');
	messageElement.classList.add('message', 'fade-in');
	messageElement.innerHTML = `
		<span class="sender">${message.sender}:</span>
		<p class="text">${message.text}</p>
	`;
	chatContainer.appendChild(messageElement);
	chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}
