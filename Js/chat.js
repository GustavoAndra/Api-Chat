function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();
    
    // Obtém o nome de usuário da sessionStorage
    var storedNick = sessionStorage.getItem("nick");

    if (message !== '' && storedNick) {
        var chatMessages = document.getElementById('chat-messages');
        var chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message');

        var userNameElement = document.createElement('p');
        userNameElement.classList.add('user-name');
        userNameElement.textContent = storedNick; // Adicionando o nome de usuário

        var messageBalloon = document.createElement('div');
        messageBalloon.classList.add('message-balloon');

        var messageContent = document.createElement('p');
        messageContent.classList.add('message-content');
        messageContent.textContent = message; // Adicionando a mensagem

        messageBalloon.appendChild(messageContent);

        chatMessage.appendChild(userNameElement);
        chatMessage.appendChild(messageBalloon);

        chatMessages.appendChild(chatMessage);
        messageInput.value = '';

        // Rolar para baixo automaticamente
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Evento de clique no botão "Enviar"
var sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', sendMessage);

// Evento de pressionar a tecla Enter no campo de texto
var messageInput = document.getElementById('message-input');
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede que a tecla Enter faça uma quebra de linha no campo de texto
        sendMessage();
    }
});
// Obtém a referência ao elemento do chat-messages
const chatMessages = document.getElementById('chat-messages');

// Função para adicionar uma mensagem estática ao chat
function addStaticMessage(message, userName) {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
  
    const userNameElement = document.createElement('p');
    userNameElement.classList.add('user-name');
    userNameElement.textContent = userName;
  
    const messageContent = document.createElement('p');
    messageContent.classList.add('message-content', 'static-message');
    messageContent.textContent = message;
  
    chatMessage.appendChild(userNameElement);
    chatMessage.appendChild(messageContent);
  
    chatMessages.appendChild(chatMessage);
  }
  
  // Adiciona mensagens estáticas ao chat
  addStaticMessage('Olá, como posso ajudar?', 'Galinheta');
  addStaticMessage('Falaaaa gurizadaaa.....', 'ANTONIE');
  addStaticMessage('G’morning my friends!!!!!!!!!', 'RHYSAND');
  addStaticMessage('IIIII, OLÁ O GRINGUINHO', 'XAULIN-ASSADO');
  addStaticMessage('Respeita as mina, menor', 'PESQUEI-ONTEM');
  