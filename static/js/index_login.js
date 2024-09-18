function validatePasswords() {
    const password = document.getElementById('cadastro_password').value;
    const confirmPassword = document.getElementById('cadastro_confirmar_password').value;
    const messageOverlay = document.getElementById('messageOverlay');
    const messageContent = document.getElementById('messageContent');

    if (password !== confirmPassword) {
        messageContent.textContent = 'As senhas devem ser iguais'; // Mensagem de erro
        messageOverlay.style.display = 'flex'; // Exibe a caixa de mensagem
        return false; // Impede o envio do formulário
    } else {

        // Armazenar o nome do usuário no localStorage
        const userName = document.getElementById('cadastro_username').value;
        localStorage.setItem('userName', userName);
        
        // Redirecionar para a página cadastro_pet.html
        window.location.href = 'cadastro_pet.html?showMessage=true';
        return false; // Evita que o formulário seja enviado novamente
    }
}

document.getElementById('closeMessage').addEventListener('click', function() {
    document.getElementById('messageOverlay').style.display = 'none'; // Oculta a caixa de mensagem 
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('cadastro_password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

document.getElementById('toggle-confirm-password').addEventListener('click', function() {
    const confirmPasswordField = document.getElementById('cadastro_confirmar_password');
    const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordField.setAttribute('type', type);
    this.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});


// Remover a duplicação e garantir que apenas uma função trata o envio do formulário
document.getElementById('cadastro_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    const tutorName = document.getElementById('cadastro_username').value; // Obtenha o nome do tutor
    localStorage.setItem('tutorName', tutorName); // Armazene o nome do tutor

    // Validação de senhas
    if (validatePasswords()) {
        window.location.href = 'cadastro_pet.html'; // Redirecionar
    }
});

