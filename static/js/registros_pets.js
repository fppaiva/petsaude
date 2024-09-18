// // // Função para carregar os registros armazenados no localStorage
// // function carregarRegistros() {
// //     return JSON.parse(localStorage.getItem('registros')) || [];
// // }

// // // Função para salvar os registros no localStorage
// // function salvarRegistros(registros) {
// //     localStorage.setItem('registros', JSON.stringify(registros));
// // }

// // // Referências aos elementos do formulário e tabela
// // const form = document.getElementById('pet-form');
// // const petRecordsTable = document.getElementById('pet-records').getElementsByTagName('tbody')[0];
// // let editarIndex = null; // Variável para rastrear o índice do registro que está sendo editado

// // // Função para adicionar ou atualizar um registro
// // function adicionarRegistro(event) {
// //     event.preventDefault();

// //     // Capturando os valores do formulário
// //     const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
// //     const nome = document.getElementById('nome').value.trim(); // Trim para evitar espaços vazios
// //     const data = document.getElementById('data').value;

// //     // Validação de campos
// //     if (!tipo || !nome || !data) {
// //         exibirMensagemErro('Por favor, preencha todos os campos.');
// //         return;
// //     }

// //     // Validação de data (não pode ser futura)
// //     const hoje = new Date();
// //     const dataSelecionada = new Date(data);
// //     if (dataSelecionada > hoje) {
// //         exibirMensagemErro('A data selecionada não pode ser posterior à data atual.');
// //         return;
// //     }

// //     ocultarMensagemErro();

// //     // Carregar registros do localStorage
// //     let registros = carregarRegistros();
// //     const registro = { tipo, nome, data };

// //     // Se estamos editando um registro, atualize-o
// //     if (editarIndex !== null) {
// //         registros[editarIndex] = registro;
// //         editarIndex = null;
// //     } else {
// //         // Caso contrário, adicione um novo registro
// //         registros.push(registro);
// //     }

// //     // Salvar registros atualizados
// //     salvarRegistros(registros);

// //     // Resetar o formulário
// //     form.reset();

// //     // Atualizar a tabela de registros
// //     atualizarTabelaRegistros();
// // }

// // // Função para exibir mensagem de erro
// // function exibirMensagemErro(mensagem) {
// //     const mensagemErroTexto = document.getElementById('mensagemErroTexto');
// //     mensagemErroTexto.textContent = mensagem;
// //     document.getElementById('mensagemErro').style.display = 'block';
// // }

// // // Função para ocultar a mensagem de erro
// // function ocultarMensagemErro() {
// //     document.getElementById('mensagemErro').style.display = 'none';
// // }

// // // Função para formatar a data no formato DD/MM/AAAA
// // function formatarData(data) {
// //     const partes = data.split('-');
// //     return `${partes[2]}/${partes[1]}/${partes[0]}`; // Formatar a data corretamente
// // }

// // // Função para atualizar a tabela de registros
// // function atualizarTabelaRegistros() {
// //     petRecordsTable.innerHTML = ''; // Limpa o conteúdo atual da tabela
// //     let registros = carregarRegistros(); // Carrega registros do localStorage

// //     // Ordena registros pela data (mais recente primeiro)
// //     registros.sort((a, b) => new Date(b.data) - new Date(a.data));

// //     // Para cada registro, criar uma linha na tabela
// //     registros.forEach((registro, index) => {
// //         const row = document.createElement('tr');
// //         row.id = `registro-${index}`; // Define um ID único para a linha

// //         row.innerHTML = `
// //             <td>${registro.tipo}</td>
// //             <td>${registro.nome}</td>
// //             <td>${formatarData(registro.data)}</td>
// //             <td>
// //                 <button onclick="habilitarEdicao(${index}, this)">Editar</button>
// //                 <button style="background-color: rgb(223, 168, 96);" onclick="excluirRegistro(${index})">Excluir</button>
// //                 <button style="display: none;" onclick="salvarEdicao(${index}, this)">Salvar</button>
// //                 <button style="display: none;" onclick="cancelarEdicao(${index}, this)">Cancelar</button>
// //             </td>
// //         `;

// //         petRecordsTable.appendChild(row);
// //     });
// // }

// // // Função para habilitar a edição de uma linha
// // function habilitarEdicao(index, botaoEditar) {
// //     const row = document.getElementById(`registro-${index}`);
// //     const cells = row.querySelectorAll('td');

// //     // Habilitar edição nas células
// //     cells[0].setAttribute('contenteditable', 'true'); // Tipo
// //     cells[1].setAttribute('contenteditable', 'true'); // Nome
// //     cells[2].setAttribute('contenteditable', 'true'); // Data

// //     // Ocultar o botão "Editar" e mostrar os botões "Salvar" e "Cancelar"
// //     botaoEditar.style.display = 'none';
// //     const botoes = botaoEditar.parentNode.querySelectorAll('button');
// //     botoes[1].style.display = 'none'; // Esconder o botão "Excluir"
// //     botoes[2].style.display = 'inline'; // Mostrar o botão "Salvar"
// //     botoes[3].style.display = 'inline'; // Mostrar o botão "Cancelar"
// // }

// // // Função para salvar as alterações de edição
// // function salvarEdicao(index, botaoSalvar) {
// //     const row = document.getElementById(`registro-${index}`);
// //     const cells = row.querySelectorAll('td');

// //     // Carregar registros do localStorage
// //     let registros = carregarRegistros();
// //     const registroEditado = {
// //         tipo: cells[0].innerText,
// //         nome: cells[1].innerText,
// //         data: cells[2].innerText.split('/').reverse().join('-') // Reverter o formato da data para salvar
// //     };

// //     registros[index] = registroEditado; // Atualizar o registro editado
// //     salvarRegistros(registros); // Salvar registros no localStorage

// //     atualizarTabelaRegistros(); // Atualizar a tabela
// // }

// // // Função para cancelar a edição
// // function cancelarEdicao(index, botaoCancelar) {
// //     atualizarTabelaRegistros(); // Recarregar a tabela para remover alterações temporárias
// // }

// // // Função para excluir um registro
// // function excluirRegistro(index) {
// //     let registros = carregarRegistros();
// //     registros.splice(index, 1); // Remove o registro

// //     salvarRegistros(registros); // Atualizar localStorage
// //     atualizarTabelaRegistros(); // Atualizar a tabela após exclusão
// // }

// // // Função para excluir todos os dados
// // function excluirDados() {
// //     localStorage.removeItem('registros'); // Limpar localStorage
// //     petRecordsTable.innerHTML = ''; // Limpar a tabela no HTML
// // }

// // // Função para fechar a mensagem de erro
// // document.getElementById('fecharMensagemErro').onclick = function() {
// //     ocultarMensagemErro();
// // };

// // // Atualizar a tabela de registros ao carregar a página
// // atualizarTabelaRegistros();

// // // Adicionar evento de submit para o formulário
// // form.addEventListener('submit', adicionarRegistro);


// // Função para carregar os registros armazenados no localStorage
// function carregarRegistros() {
//     return JSON.parse(localStorage.getItem('registros')) || [];
// }

// // Função para salvar os registros no localStorage
// function salvarRegistros(registros) {
//     localStorage.setItem('registros', JSON.stringify(registros));
// }

// // Referências aos elementos do formulário e tabela
// const form = document.getElementById('pet-form');
// const petRecordsTable = document.getElementById('pet-records').getElementsByTagName('tbody')[0];
// let editarIndex = null; // Variável para rastrear o índice do registro que está sendo editado

// // Função para adicionar ou atualizar um registro
// function adicionarRegistro(event) {
//     event.preventDefault();

//     const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
//     const nome = document.getElementById('nome').value.trim();
//     const data = document.getElementById('data').value;

//     if (!tipo || !nome || !data) {
//         exibirMensagemErro('Por favor, preencha todos os campos.');
//         return;
//     }

//     const hoje = new Date();
//     const dataSelecionada = new Date(data);
//     if (dataSelecionada > hoje) {
//         exibirMensagemErro('A data selecionada não pode ser posterior à data atual.');
//         return;
//     }

//     ocultarMensagemErro();

//     let registros = carregarRegistros();
//     const registro = { tipo, nome, data };

//     if (editarIndex !== null) {
//         registros[editarIndex] = registro;
//         editarIndex = null;
//     } else {
//         registros.push(registro);
//     }

//     salvarRegistros(registros);
//     form.reset();
//     atualizarTabelaRegistros();
// }

// // Função para exibir mensagem de erro
// function exibirMensagemErro(mensagem) {
//     const mensagemErroTexto = document.getElementById('mensagemErroTexto');
//     mensagemErroTexto.textContent = mensagem;
//     document.getElementById('mensagemErro').style.display = 'block';
// }

// // Função para ocultar a mensagem de erro
// function ocultarMensagemErro() {
//     document.getElementById('mensagemErro').style.display = 'none';
// }

// // Função para formatar a data no formato DD/MM/AAAA
// function formatarData(data) {
//     const partes = data.split('-');
//     const dia = partes[2].padStart(2, '0');
//     const mes = partes[1].padStart(2, '0');
//     const ano = partes[0];
//     return `${dia}/${mes}/${ano}`;
// }

// // Função para atualizar a tabela de registros
// function atualizarTabelaRegistros() {
//     petRecordsTable.innerHTML = ''; // Limpa o conteúdo atual da tabela
//     let registros = carregarRegistros();

//     // Verifica se há registros
//     if (registros.length === 0) {
//         const row = document.createElement('tr');
//         const cell = document.createElement('td');
//         cell.colSpan = 4;
//         cell.textContent = "Nenhum registro encontrado.";
//         row.appendChild(cell);
//         petRecordsTable.appendChild(row);
//     } else {
//         // Ordena os registros pela data
//         registros.sort((a, b) => new Date(b.data) - new Date(a.data));

//         registros.forEach((registro, index) => {
//             const row = document.createElement('tr');
//             row.id = `registro-${index}`;

//             row.innerHTML = `
//                 <td>${registro.tipo}</td>
//                 <td>${registro.nome}</td>
//                 <td>${formatarData(registro.data)}</td>
//                 <td>
//                     <button onclick="habilitarEdicao(${index}, this)">Editar</button>
//                     <button style="background-color: rgb(223, 168, 96);" onclick="excluirRegistro(${index})">Excluir</button>
//                     <button style="display: none;" onclick="salvarEdicao(${index}, this)">Salvar</button>
//                     <button style="display: none;" onclick="cancelarEdicao(${index}, this)">Cancelar</button>
//                 </td>
//             `;

//             petRecordsTable.appendChild(row);
//         });
//     }
// }

// // Função para habilitar a edição de uma linha
// function habilitarEdicao(index, botaoEditar) {
//     const row = document.getElementById(`registro-${index}`);
//     const cells = row.querySelectorAll('td');

//     cells[0].setAttribute('contenteditable', 'true');
//     cells[1].setAttribute('contenteditable', 'true');
//     cells[2].setAttribute('contenteditable', 'true');

//     botaoEditar.style.display = 'none';
//     const botoes = botaoEditar.parentNode.querySelectorAll('button');
//     botoes[1].style.display = 'none';
//     botoes[2].style.display = 'inline';
//     botoes[3].style.display = 'inline';
// }

// // Função para salvar as alterações de edição
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

// // Função para cancelar a edição
// function cancelarEdicao(index, botaoCancelar) {
//     atualizarTabelaRegistros();
// }

// // Função para excluir um registro
// function excluirRegistro(index) {
//     let registros = carregarRegistros();
//     registros.splice(index, 1);

//     salvarRegistros(registros);
//     atualizarTabelaRegistros();
// }

// // Função para excluir todos os dados
// function excluirDados() {
//     localStorage.removeItem('registros');
//     petRecordsTable.innerHTML = '';
// }

// // Inicializa a tabela de registros ao carregar a página
// atualizarTabelaRegistros();

// // Adicionar evento de submit ao formulário
// form.addEventListener('submit', adicionarRegistro);


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

    console.log('Fomulario enviado')

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
        editarIndex = null;
    } else {
        registros.push(registro);
    }

    salvarRegistros(registros);
    form.reset();
    atualizarTabelaRegistros();
}

// Função para exibir mensagem de erro
function exibirMensagemErro(mensagem) {
    const mensagemErroTexto = document.getElementById('mensagemErroTexto');
    mensagemErroTexto.textContent = mensagem;
    document.getElementById('mensagemErro').style.display = 'block';
}

// Função para ocultar a mensagem de erro
function ocultarMensagemErro() {
    document.getElementById('mensagemErro').style.display = 'none';
}

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

    if (registros.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 4;
        cell.textContent = "Nenhum registro encontrado.";
        row.appendChild(cell);
        petRecordsTable.appendChild(row);
    } else {
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

    cells[0].setAttribute('contenteditable', 'true');
    cells[1].setAttribute('contenteditable', 'true');
    cells[2].setAttribute('contenteditable', 'true');

    botaoEditar.style.display = 'none';
    const botoes = botaoEditar.parentNode.querySelectorAll('button');
    botoes[1].style.display = 'none'; // Esconder o botão "Excluir"
    botoes[2].style.display = 'inline'; // Mostrar o botão "Salvar"
    botoes[3].style.display = 'inline'; // Mostrar o botão "Cancelar"
}

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

    registros[index] = registroEditado;
    salvarRegistros(registros);
    atualizarTabelaRegistros();
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
