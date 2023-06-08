// Obtém o formulário e o campo de nick
var loginForm = document.getElementById("loginForm");
var nickInput = document.getElementById("nick");
// Manipulador de evento para o envio do formulário
function formSubmit(event) {
    event.preventDefault(); // Evita o envio do formulário

    var nick = nickInput.value.trim();

    if (nick !== "") {
        // Redireciona para a página das salas
        window.location.href = "salas.html?nick=" + encodeURIComponent(nick);
    }
}

// Adiciona o evento de envio do formulário
loginForm.addEventListener("submit", formSubmit);

