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

function redirecionarParaSala(elemento) 
{
    var nomeSala = elemento.innerText;
    var svgElement = elemento.querySelector('svg.cadeado');

    if (svgElement == null) {
        window.location.href = "sala-publica.html?sala=" + encodeURIComponent(nomeSala);
    } else {
        // Caso contrário, redirecionar para a sala pública
        window.location.href = "sala-privada.html?sala=" + encodeURIComponent(nomeSala);
    }
}

// Selecionar todos os elementos com a classe "cadeado"
var elementosCadeado = document.querySelectorAll('.cadeado');

// Percorrer os elementos encontrados
elementosCadeado.forEach(function(elemento)
 {
  // Encontrar o elemento pai que contém a sala
  var sala = elemento.closest('.row');
  
  // Adicionar o evento de clique para redirecionar para a sala privada
  sala.addEventListener('click', function() {
    var nomeSala = sala.querySelector('h2').innerText;
    window.location.href = "sala-privada.html?sala=" + encodeURIComponent(nomeSala);
  });
});
