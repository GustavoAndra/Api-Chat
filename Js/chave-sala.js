// Obtém o elemento de título da página de chave-sala
var nomeSalaElement = document.getElementById("nomeSala");

// Verifica se o parâmetro 'sala' está presente na URL
var urlParams = new URLSearchParams(window.location.search);
var nomeSala = urlParams.get('sala');

if (nomeSala) 
{
    // Define o nome da sala no elemento de título da página
    nomeSalaElement.textContent = nomeSala;
} 
else
 {
    // Redireciona para a página de salas caso o parâmetro 'sala' esteja ausente
    window.location.href = "./salas.html";
}

var entrarButton = document.getElementById('entrarButton');
if (entrarButton) {
    entrarButton.addEventListener('click', function() {
        redirecionarParaSalaPrivada(nomeSala);
    });
}

function redirecionarParaSalaPrivada(nomeSala) {
    if (nomeSala) {
        // Implemente o redirecionamento para a sala privada, passando o nome da sala como parâmetro
        // Por exemplo:
        window.location.href = 'sala-privada.html?sala=' + encodeURIComponent(nomeSala);
    } else {
        // Exiba uma mensagem de erro caso o nome da sala não esteja definido
        alert('Nome da sala não encontrado!');
    }
}
