// Função para enviar mensagem
function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value;
  
    if (message.trim() !== '') {
      var chatMessages = document.getElementById('chat-messages');
      var messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.textContent = message;
      chatMessages.appendChild(messageElement);
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
      sendMessage();
    }
  });