document.addEventListener('DOMContentLoaded', function() {
  var privadaCheckbox = document.getElementById("privada");
  var chaveSalaWrapper = document.getElementById("chaveSalaWrapper");

  privadaCheckbox.addEventListener("change", function() {
    if (privadaCheckbox.checked) {
      chaveSalaWrapper.style.display = "block";
    } else {
      chaveSalaWrapper.style.display = "none";
    }
  });
// Função para redirecionar para a sala e exibir o nome da sala
function redirecionarSala(_event) {
 
  var isPrivada = document.getElementById("privada").checked;
  var nomeSala = document.getElementById("nome").value;

  if (isPrivada) {
    // Redirecionar para a sala privada e passar o nome como parâmetro
    window.location.href = "sala-privada.html?nome=" + encodeURIComponent(nomeSala);
  } 
}
// Adicionar um ouvinte de evento ao botão "Criar"
var criarButton = document.querySelector(".button-entrar button");
criarButton.addEventListener("click", redirecionarSala);
});