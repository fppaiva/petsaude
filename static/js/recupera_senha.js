const form = document.getElementById('recovery-form');
const mensagemSucesso = document.getElementById('mensagemSucesso');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    mensagemSucesso.style.display = 'block';
    form.reset();
});

document.getElementById('fecharMensagemSucesso').addEventListener('click', function() {
    mensagemSucesso.style.display = 'none';
});