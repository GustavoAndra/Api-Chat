var urlParams = new URLSearchParams(window.location.search);
var nick = urlParams.get('nick');

// Obtém o elemento de título da página de salas
var salasTitle = document.getElementById("salasTitle");

if (nick) {
    // Define o nome como título da página de salas
    salasTitle.textContent = nick;
} else {
    // Redireciona de volta para a página de login
    window.location.href = "index.html";
}