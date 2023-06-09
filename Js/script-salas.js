// Obtém o elemento de título da página de salas
var salasTitle = document.getElementById("salasTitle");

// Verifica se o parâmetro 'nick' está presente na URL
var urlParams = new URLSearchParams(window.location.search);
var nick = urlParams.get('nick');

if (nick) {
  // Define o nome como título da página de salas
  salasTitle.textContent = nick;
  // Armazena o nome do usuário na sessionStorage
  sessionStorage.setItem("nick", nick);
} else {
  // Obtém o nome do usuário armazenado na sessionStorage
  var storedNick = sessionStorage.getItem("nick");

  if (storedNick) {
    // Exibe o nome armazenado como título da página de salas
    salasTitle.textContent = storedNick;
  }
}

// Função para redirecionar para a tela de chave-sala
function redirecionarParaChaveSala(nomeSala) {
  window.location.href = "chave-sala.html?sala=" + encodeURIComponent(nomeSala);
}

// Função para redirecionar para a sala pública com o nome da sala
function redirecionarParaSalaPublica(nomeSala) {
  window.location.href = "sala-publica.html?sala=" + encodeURIComponent(nomeSala);
}

// Função para executar após o carregamento do documento
document.addEventListener('DOMContentLoaded', function() {
  var elementosCadeado = document.querySelectorAll('.cadeado');

  elementosCadeado.forEach(function(elemento) {
    var sala = elemento.closest('.row');
    var nomeSalaElement = sala.querySelector('h2');
    var nomeSala = nomeSalaElement.textContent;

    if (elemento.classList.contains('cadeado')) {
      sala.addEventListener('click', function() {
        redirecionarParaChaveSala(nomeSala);
      });
    } else {
      sala.addEventListener('click', function() {
    
        redirecionarParaSalaPublica(nomeSala);
      });
    }
  });
});