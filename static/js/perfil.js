document.addEventListener('DOMContentLoaded', () => {
    const tutorName = localStorage.getItem('tutorName');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const petName = localStorage.getItem('petName');
    const petBreed = localStorage.getItem('petBreed');
    const petBirthDate = localStorage.getItem('petBirthDate');

    // Função para formatar data no formato dd/mm/aaaa
    function formatarData(data) {
        if (!data) return 'Não definido';

        const dateObj = new Date(data);
        const dia = dateObj.getDate().toString().padStart(2, '0');
        const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const ano = dateObj.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    // Função para calcular a idade do pet em anos, meses e dias
    function calcularIdade(dataNascimento) {
        if (!dataNascimento) return 'Não definido';

        const hoje = new Date();
        const dataNasc = new Date(dataNascimento);

        let idadeAnos = hoje.getFullYear() - dataNasc.getFullYear();
        let idadeMeses = hoje.getMonth() - dataNasc.getMonth();
        let idadeDias = hoje.getDate() - dataNasc.getDate();

        // Correção se os meses derem negativo
        if (idadeMeses < 0 || (idadeMeses === 0 && idadeDias < 0)) {
            idadeAnos--;
            idadeMeses += 12;
        }

        // Correção se os dias derem negativo
        if (idadeDias < 0) {
            const ultimoDiaMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
            idadeMeses--;
            idadeDias += ultimoDiaMesAnterior;
        }

        return { anos: idadeAnos, meses: idadeMeses, dias: idadeDias };
    }

    // Define os dados na página
    document.getElementById('username').textContent = tutorName ? tutorName : 'Não definido';
    document.getElementById('userName').textContent = username ? username : 'Não definido';
    document.getElementById('userEmail').textContent = email ? email : 'Não definido';
    document.getElementById('petName').textContent = petName ? petName : 'Não definido';
    document.getElementById('petBreed').textContent = petBreed ? petBreed : 'Não definido';

    // Formata a data de nascimento para dd/mm/aaaa
    const formattedPetBirthDate = formatarData(petBirthDate);
    document.getElementById('petBirthDate').textContent = formattedPetBirthDate;

    // Calcula a idade do pet em anos, meses e dias
    const idadePet = calcularIdade(petBirthDate);

    // Exibe o nome do pet concatenado com a idade em anos, 
    if (petName) {
        const petAgeElement = document.getElementById('petAge');
        petAgeElement.innerHTML = `
            <div style="text-align: center;">
                <span style="font-size: smaller;">${petName} tem<br> ${idadePet.anos} ano(s)<br> ${idadePet.meses} mes(es)<br> e ${idadePet.dias} dias</span><br><br>
                <img src="../static/imagens/boloNiver.png" alt="" style="width: 100px; height: auto;">
            </div><br>`;
    } else {
        document.getElementById('petAge').textContent = 'Nome do pet não encontrado.';
    }
    
    

    // Exibe o nome do tutor no elemento com id 'resultado'
    if (username) {
        document.getElementById('resultado').innerText = `Tutor: ${username}`;
    } else {
        document.getElementById('resultado').innerText = 'Nome do tutor não encontrado.';
    }

});



