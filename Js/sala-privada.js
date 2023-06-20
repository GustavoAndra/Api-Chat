var entrarButton = document.getElementById('entrarButton');
if (entrarButton) {
    entrarButton.addEventListener('click', function() {
        var nomeSala = document.getElementById('nomeSala').innerText;
        window.location.href = 'sala-privada.html?sala=' + encodeURIComponent(nomeSala);
    });
}
