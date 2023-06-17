function exibirNomeSala() 
{
    var urlParams = new URLSearchParams(window.location.search);
    var nomeSala = urlParams.get('sala');
    document.getElementById('nomeSala').innerText = nomeSala;
}