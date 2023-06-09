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

// Obtém todos os elementos das salas
var salas = document.getElementsByClassName("row");

// Adiciona um evento de clique a cada sala
for (var i = 0; i < salas.length; i++) {
    salas[i].addEventListener("click", function()
     {
        // Verifica se a sala é privada
        var isPrivada = this.getAttribute("data-privada") === "true";

        if (isPrivada) 
        {
            // Redireciona a página para a inserção do código da sala
            window.location.href = "sala-privada";
        } 
        else
         {
            window.location.href = "sala-publica";
        }
    });
}
