const privadaCheckbox = document.getElementById("privada");
const chaveSalaWrapper = document.getElementById("chaveSalaWrapper");
privadaCheckbox.addEventListener("change", function() 
{
    if (privadaCheckbox.checked) 
    {
        chaveSalaWrapper.style.display = "block";
    } 
    else 
    {
        chaveSalaWrapper.style.display = "none";
    }
});

//Quando clicar em privada ele vai para uma sala privada, senão não

function redirecionarSala() 
{
    var isPrivada = document.getElementById("privada").checked;
    
    if (isPrivada) 
    {
        // Redirecionar para a sala privada
        window.location.href = "sala-privada.html";
    }
     else
      {
        // Redirecionar para a sala pública
        window.location.href = "sala-publica.html";
    }
}

// Adicionar um ouvinte de evento ao botão "Criar"
var criarButton = document.querySelector(".button-entrar button");
criarButton.addEventListener("click", redirecionarSala);