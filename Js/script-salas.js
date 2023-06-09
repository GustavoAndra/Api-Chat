var urlParams = new URLSearchParams(window.location.search);
var nick = urlParams.get('nick');

// Obtém o elemento de título da página de salas
var salasTitle = document.getElementById("salasTitle");

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
