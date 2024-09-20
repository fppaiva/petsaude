// Função para carregar os registros armazenados no localStorage
function carregarRegistros() {
    return JSON.parse(localStorage.getItem('registros')) || [];
}

// Função para salvar os registros no localStorage
function salvarRegistros(registros) {
    localStorage.setItem('registros', JSON.stringify(registros));
}

// Referências aos elementos do formulário e tabela
const form = document.getElementById('pet-form');
const petRecordsTable = document.getElementById('pet-records').getElementsByTagName('tbody')[0];
let editarIndex = null; // Variável para rastrear o índice do registro que está sendo editado

// Função para adicionar ou atualizar um registro
function adicionarRegistro(event) {
    event.preventDefault();

    const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
    const nome = document.getElementById('nome').value.trim();
    const data = document.getElementById('data').value;

    if (!tipo || !nome || !data) {
        exibirMensagemErro('Por favor, preencha todos os campos.');
        return;
    }

    const hoje = new Date();
    const dataSelecionada = new Date(data);
    if (dataSelecionada > hoje) {
        exibirMensagemErro('A data selecionada não pode ser posterior à data atual.');
        return;
    }

    ocultarMensagemErro();
    

    let registros = carregarRegistros();
    const registro = { tipo, nome, data };

    if (editarIndex !== null) {
        registros[editarIndex] = registro;
        editarIndex = null; // Limpa o índice de edição
    } else {
        registros.push(registro); // Adiciona o novo registro ao array
    }

    salvarRegistros(registros); // Salva os registros no localStorage
    form.reset(); // Limpa o formulário
    atualizarTabelaRegistros(); // Atualiza a tabela de registros na interface
}


// Função para exibir mensagem de erro
// function exibirMensagemErro(mensagem) {
//     const mensagemErroTexto = document.getElementById('mensagemErroTexto');
//     mensagemErroTexto.textContent = mensagem;
//     document.getElementById('mensagemErro').style.display = 'block';
// }

// Função para exibir mensagem de erro
function exibirMensagemErro(mensagem) {
    const mensagemErroTexto = document.getElementById('mensagemErroTexto');
    mensagemErroTexto.textContent = mensagem;
    document.getElementById('mensagemErro').style.display = 'block';

    // Adiciona evento de clique ao botão "OK"
    const fecharMensagemErro = document.getElementById('fecharMensagemErro');
    fecharMensagemErro.addEventListener('click', () => {
        ocultarMensagemErro();
    });
}

// Função para ocultar a mensagem de erro
function ocultarMensagemErro() {
    document.getElementById('mensagemErro').style.display = 'none';
}

// // Função para ocultar a mensagem de erro
// function ocultarMensagemErro() {
//     document.getElementById('mensagemErro').style.display = 'none';
// }

// Função para formatar a data no formato DD/MM/AAAA
function formatarData(data) {
    const partes = data.split('-');
    const dia = partes[2].padStart(2, '0');
    const mes = partes[1].padStart(2, '0');
    const ano = partes[0];
    return `${dia}/${mes}/${ano}`;
}


// Função para atualizar a tabela de registros
function atualizarTabelaRegistros() {
    petRecordsTable.innerHTML = ''; // Limpa o conteúdo atual da tabela
    let registros = carregarRegistros();

    if (registros === null || registros === undefined || registros.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4;
        cell.textContent = "Nenhum registro encontrado.";
        row.appendChild(cell);
        petRecordsTable.appendChild(row);
    } else {
        // Filtra registros válidos que possuem a propriedade 'data' definida
        registros = registros.filter(registro => registro && registro.data);

        // Ordena os registros por data (do mais recente para o mais antigo)
        registros.sort((a, b) => new Date(b.data) - new Date(a.data));

        registros.forEach((registro, index) => {
            const row = document.createElement('tr');
            row.id = `registro-${index}`;

            row.innerHTML = `
                <td>${registro.tipo}</td>
                <td>${registro.nome}</td>
                <td>${formatarData(registro.data)}</td>
                <td>
                    <button onclick="habilitarEdicao(${index}, this)">Editar</button>
                    <button style="background-color: rgb(223, 168, 96);" onclick="excluirRegistro(${index})">Excluir</button>
                    <button style="display: none;" onclick="salvarEdicao(${index}, this)">Salvar</button>
                    <button style="display: none;" onclick="cancelarEdicao(${index}, this)">Cancelar</button>
                </td>
            `;

            petRecordsTable.appendChild(row);
        });
    }
}


// Função para habilitar a edição de uma linha
function habilitarEdicao(index, botaoEditar) {
    const row = document.getElementById(`registro-${index}`);
    const cells = row.querySelectorAll('td');

    // Habilita edição apenas da linha selecionada
    cells[0].setAttribute('contenteditable', 'true');
    cells[1].setAttribute('contenteditable', 'true');
    cells[2].setAttribute('contenteditable', 'true');

    // Altera botões visíveis
    botaoEditar.style.display = 'none';
    const botoes = botaoEditar.parentNode.querySelectorAll('button');
    // botoes[1].style.display = 'none'; // Esconder o botão "Excluir"
    // botoes[2].style.display = 'inline'; // Mostrar o botão "Salvar"
    // botoes[3].style.display = 'inline'; // Mostrar o botão "Cancelar"
    botoes[1].style.display = 'inline'; // Mostra o botão "Salvar"
    botoes[2].style.display = 'inline'; // Mostra o botão "Cancelar"

    // Define o índice de edição globalmente
    editarIndex = index;
}

// Função para salvar as alterações de edição
// function salvarEdicao(index, botaoSalvar) {
//     const row = document.getElementById(`registro-${index}`);
//     const cells = row.querySelectorAll('td');

//     let registros = carregarRegistros();
//     const registroEditado = {
//         tipo: cells[0].innerText,
//         nome: cells[1].innerText,
//         data: cells[2].innerText.split('/').reverse().join('-')
//     };

//     registros[index] = registroEditado;
//     salvarRegistros(registros);
//     atualizarTabelaRegistros();
// }
// Função para salvar as alterações de edição
// function salvarEdicao(index, botaoSalvar) {
//     const row = document.getElementById(`registro-${index}`);
//     const cells = row.querySelectorAll('td');

//     let registros = carregarRegistros();
//     const registroEditado = {
//         tipo: cells[0].innerText,
//         nome: cells[1].innerText,
//         data: cells[2].innerText.split('/').reverse().join('-')
//     };

//     registros[index] = registroEditado; // Substitui o registro antigo pelo editado
//     salvarRegistros(registros); // Salva os registros atualizados no localStorage
//     editarIndex = null; // Limpa o índice de edição
//     atualizarTabelaRegistros(); // Atualiza a tabela de registros na interface
// }
// Função para salvar as alterações de edição
function salvarEdicao(index, botaoSalvar) {
    const row = document.getElementById(`registro-${index}`);
    const cells = row.querySelectorAll('td');

    let registros = carregarRegistros();
    const registroEditado = {
        tipo: cells[0].innerText,
        nome: cells[1].innerText,
        data: cells[2].innerText.split('/').reverse().join('-')
    };

    registros[index] = registroEditado; // Atualiza o registro no array de registros
    salvarRegistros(registros); // Salva os registros atualizados no localStorage

    // Remove a linha antiga da tabela
    petRecordsTable.removeChild(row);

    // Cria uma nova linha com os dados atualizados
    const novaRow = document.createElement('tr');
    novaRow.id = `registro-${index}`;
    novaRow.innerHTML = `
        <td>${registroEditado.tipo}</td>
        <td>${registroEditado.nome}</td>
        <td>${formatarData(registroEditado.data)}</td>
        <td>
            <button onclick="habilitarEdicao(${index}, this)">Editar</button>
            <button style="background-color: rgb(223, 168, 96);" onclick="excluirRegistro(${index})">Excluir</button>
            <button style="display: none;" onclick="salvarEdicao(${index}, this)">Salvar</button>
            <button style="display: none;" onclick="cancelarEdicao(${index}, this)">Cancelar</button>
        </td>
    `;

    // Insere a nova linha na tabela
    petRecordsTable.appendChild(novaRow);
}



// Função para cancelar a edição
function cancelarEdicao(index, botaoCancelar) {
    atualizarTabelaRegistros();
}

// Função para excluir um registro
function excluirRegistro(index) {
    let registros = carregarRegistros();
    registros.splice(index, 1);

    salvarRegistros(registros);
    atualizarTabelaRegistros();
}

// Função para excluir todos os dados
function excluirDados() {
    localStorage.removeItem('registros');
    petRecordsTable.innerHTML = '';

    ocultarConfirmacaoExclusao(); // Oculta a caixa de confirmação
}

// Função para exibir a confirmação de exclusão
function exibirConfirmacaoExclusao() {
    document.getElementById('confirmacaoExclusao').style.display = 'block';
}

// Função para ocultar a confirmação de exclusão
function ocultarConfirmacaoExclusao() {
    document.getElementById('confirmacaoExclusao').style.display = 'none';
}

// Inicializa a tabela de registros ao carregar a página
atualizarTabelaRegistros();

// Adicionar evento de submit ao formulário
form.addEventListener('submit', adicionarRegistro);
