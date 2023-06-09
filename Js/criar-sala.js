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
