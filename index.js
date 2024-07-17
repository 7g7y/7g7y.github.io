// 客户端生成随机用户名
var username = '用户' + Math.floor(Math.random() * 1000);

// WebSocket 服务器地址，替换为你的实际地址
var socketUrl = 'wss://clouddata.turbowarp.org';

// 连接到 WebSocket 服务器
var socket = new WebSocket(socketUrl);

// 当 WebSocket 连接成功时执行
socket.onopen = function(event) {
    console.log('WebSocket 连接成功');
};

// 当接收到来自服务器的消息时执行
socket.onmessage = function(event) {
    var message = JSON.parse(event.data);
    displayMessage(message);
};

// 当 WebSocket 连接关闭时执行
socket.onclose = function(event) {
    console.log('WebSocket 连接关闭');
};

// 发送消息到服务器
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value;
    messageInput.value = '';

    if (message.trim() === '') {
        return;
    }

    var messageObject = {
        type: 'message',
        user: username,
        text: message
    };

    socket.send(JSON.stringify(messageObject));

    displayMessage(messageObject);
}

// 将消息显示在聊天窗口中
function displayMessage(message) {
    var chatMessages = document.getElementById('chat-messages');
    var messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');

    var messageInfo = document.createElement('span');
    messageInfo.classList.add('message-info');
    messageInfo.innerText = message.user + ': ';
    messageElement.appendChild(messageInfo);

    var messageText = document.createElement('span');
    messageText.innerText = message.text;
    messageElement.appendChild(messageText);

    chatMessages.appendChild(messageElement);

    // 滚动到聊天窗口底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
