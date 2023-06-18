// Função para enviar mensagem
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value.trim();
    
    // Obtém o nome de usuário da sessionStorage
    var storedNick = sessionStorage.getItem("nick");

    if (message !== '' && storedNick) {
        var chatMessages = document.getElementById('chat-messages');
        var chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message');

        var avatarImg = document.createElement('img');
        avatarImg.src = 'path-to-your-user-avatar';
        avatarImg.alt = storedNick; // Usando o nome de usuário armazenado

        avatarImg.classList.add('user-avatar');

        var messageContent = document.createElement('p');
        messageContent.classList.add('message-content');
        messageContent.textContent =  message; // Adicionando o nome de usuário à mensagem

        chatMessage.appendChild(avatarImg);
        chatMessage.appendChild(messageContent);

        chatMessages.appendChild(chatMessage);
        messageInput.value = '';
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
// Função para adicionar uma mensagem ao chat
function addMessage(message, userName, userAvatar) {
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message');

  const avatarImg = document.createElement('img');
  avatarImg.src = `Img/${userAvatar}`;
  avatarImg.alt = userName;
  avatarImg.classList.add('user-avatar');

  const messageContent = document.createElement('p');
  messageContent.classList.add('message-content');
  messageContent.textContent = `    ${message}`;

  chatMessage.appendChild(avatarImg);
  chatMessage.appendChild(messageContent);

  chatMessages.appendChild(chatMessage);
}
  // Adiciona mensagens estáticas ao chat
  addMessage('Olá, como posso ajudar?', 'Galinheta', '../');
  addMessage('Falaaaa gurizadaaa.....', 'ANTONIE', 'caminho-da-imagem-usuario-2');
  addMessage('G’morning my friends!!!!!!!!!', 'RHYSAND', 'caminho-da-imagem-usuario-1');
  addMessage('IIIII, OLÁ O GRINGUINHO', 'XAULIN-ASSADO', 'caminho-da-imagem-usuario-1');
  addMessage('Respeita as mina, menor', 'PESQUEI-ONTEM', 'caminho-da-imagem-usuario-1');