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
    const nome = document.getElementById('nome').value;
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
        editarIndex = null;
    } else {
        registros.push(registro);
    }

    salvarRegistros(registros);
    form.reset();
    atualizarTabelaRegistros();
}

function formatarData(data) {
    const partes = data.split('-');
    const dia = partes[2].padStart(2, '0');
    const mes = partes[1].padStart(2, '0');
    const ano = partes[0];
    return `${dia}/${mes}/${ano}`;
}

function atualizarTabelaRegistros() {
    petRecordsTable.innerHTML = '';
    let registros = carregarRegistros();
    registros.sort((a, b) => new Date(b.data) - new Date(a.data));

    registros.forEach((registro, index) => {
        const row = petRecordsTable.insertRow();
        row.innerHTML = `
            <td>${registro.tipo}</td>
            <td>${registro.nome}</td>
            <td>${formatarData(registro.data)}</td>
            <td>
                <button onclick="editarRegistro(${index})">Editar</button>
                <button style="background-color: rgb(223, 168, 96);" onclick="excluirRegistro(${index})">Excluir</button>
            </td>
        `;
    });
}

function excluirRegistro(index) {
    let registros = carregarRegistros();
    registros.splice(index, 1);
    salvarRegistros(registros);
    atualizarTabelaRegistros();
}

function editarRegistro(index) {
    let registros = carregarRegistros();
    const registro = registros[index];

    document.querySelector(`input[name="tipo"][value="${registro.tipo}"]`).checked = true;
    document.getElementById('nome').value = registro.nome;
    document.getElementById('data').value = registro.data;

    editarIndex = index;
}

function excluirDados() {
    localStorage.removeItem('registros');
    atualizarTabelaRegistros();
    ocultarConfirmacaoExclusao();
}

function exibirConfirmacaoExclusao() {
    document.getElementById('confirmacaoExclusao').style.display = 'block';
}

function ocultarConfirmacaoExclusao() {
    document.getElementById('confirmacaoExclusao').style.display = 'none';
}

function exibirMensagemErro(mensagem) {
    const mensagemErroTexto = document.getElementById('mensagemErroTexto');
    mensagemErroTexto.textContent = mensagem;
    document.getElementById('mensagemErro').style.display = 'block';
}

// Adiciona o evento de clique ao botão "OK"
const fecharMensagemErro = document.getElementById('fecharMensagemErro');
fecharMensagemErro.onclick = function() {
    ocultarMensagemErro();
};


function ocultarMensagemErro() {
    document.getElementById('mensagemErro').style.display = 'none';
}

atualizarTabelaRegistros();
form.addEventListener('submit', adicionarRegistro);
