document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos
    const messageOverlay = document.getElementById('messageOverlay');
    const closeMessageButton = document.getElementById('closeMessage');
    const successOverlay = document.getElementById('successOverlay');
    const closeSuccessMessageButton = document.getElementById('closeSuccessMessage');
    const overlay = document.getElementById('overlay');
    const bodyElement = document.body;
    const form = document.querySelector('form'); // Seleciona o formulário

    // Exibir a mensagem ao carregar a página, se o parâmetro showMessage for true
    const urlParams = new URLSearchParams(window.location.search);
    const showMessage = urlParams.get('showMessage');

    if (showMessage === 'true') {
        // Exibir mensagem e aplicar desfoque
        messageOverlay.style.display = 'flex';
        overlay.style.display = 'block';
        bodyElement.classList.add('blurred');

        // Personalizar a mensagem
        const userName = localStorage.getItem('userName');
        if (userName) {
            const messageContent = document.getElementById('messageContent');
            messageContent.innerHTML = `Olá, ${userName}!<br>É muito bom ter você por aqui. Por gentileza, finalize seu cadastro.`;
        } else {
            console.error('Nome de usuário não encontrado no localStorage.');
        }
    }

    // Fechar a mensagem e remover o desfoque
    closeMessageButton.addEventListener('click', () => {
        messageOverlay.style.display = 'none';
        overlay.style.display = 'none';
        bodyElement.classList.remove('blurred');
    });

    // Exibir a mensagem de sucesso após o envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio do formulário para mostrar a mensagem

        // Obtém os valores dos campos do formulário
        const tutorName = localStorage.getItem('userName'); // Aqui está o nome do tutor
        const username = document.getElementById('nome_usuario').value;
        const email = document.getElementById('email').value;
        const petName = document.getElementById('nomePet').value;
        const petBreed = document.getElementById('racaPet').value;
        const petBirthDate = document.getElementById('dataNascimento').value;

        // Armazena os dados no localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('petName', petName);
        localStorage.setItem('petBreed', petBreed);
        localStorage.setItem('petBirthDate', petBirthDate);

        // Verifique se o nome do tutor foi armazenado corretamente
        if (tutorName) {
            localStorage.setItem('tutorName', tutorName);
        }
        
        // Exibir a mensagem de sucesso
        successOverlay.style.display = 'flex';
        bodyElement.classList.add('blurred');
        overlay.style.display = 'block';


        // Limpar os campos do formulário após exibir a mensagem de sucesso
        document.getElementById('nome_usuario').value = '';
        document.getElementById('email').value = '';
        document.getElementById('nomePet').value = '';
        document.getElementById('racaPet').value = '';
        document.getElementById('dataNascimento').value = '';

        // Ocultar a mensagem de sucesso após 5 segundos ou quando o usuário clicar em "OK"
        setTimeout(() => {
            successOverlay.style.display = 'none';
            bodyElement.classList.remove('blurred');
            overlay.style.display = 'none';
        }, 8000); // Tempo em milissegundos (1000 ms = 1 segundos)

        // Fechar a mensagem de sucesso quando o botão "OK" for clicado
        closeSuccessMessageButton.addEventListener('click', () => {
            successOverlay.style.display = 'none';
            bodyElement.classList.remove('blurred');
            overlay.style.display = 'none';
        });

    });
});

