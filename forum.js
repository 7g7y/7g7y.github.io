function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value;
    messageInput.value = '';

    if (message.trim() === '') {
        return;
    }

    var messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('chat-message');

    var chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageElement);

    // Optional: Scroll to bottom of chat window
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

