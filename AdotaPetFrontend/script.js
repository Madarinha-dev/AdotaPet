const TelaPrincipal = document.getElementById("tela-principal");
const TelaAnimais = document.getElementById("tela-animais");
const TelaAdocoes = document.getElementById("tela-adocoes");
const TelaAdotantes = document.getElementById("tela-adotantes");

// URL base da API Spring Boot rodando localmente
const API_BASE_URL = 'http://localhost:8080';
let animalIdEmEdicao = null;
let adotanteIdEmEdicao = null;

TelaAnimais.style.display = 'none';
TelaAdocoes.style.display = 'none';
TelaAdotantes.style.display = 'none';

// para fechar todos os drops que estiverem aberto caso o clique seja no documento
document.addEventListener('click', function(event) {
    const dropdawNovaAdocao = document.getElementById('tela-principal-botao-nova-adocao');
    const dropdawNovoAnimal = document.getElementById("tela-animal-botao-novo-animal");

    // alert('CLIQUE'+event.target);
    console.log(event.target);
    if (event.target.id == 'tela-animais') {
        dropdawNovoAnimal.style.display = 'none';
        dropdawNovaAdocao.style.display = 'none';
    }
});

function telaPrincipal() {
    TelaAdocoes.style.display = 'none';
    TelaAdotantes.style.display = 'none';
    TelaAnimais.style.display = 'none';
    TelaPrincipal.style.display = 'block';
}


function telaAnimais() {
    TelaAdocoes.style.display = 'none';
    TelaAdotantes.style.display = 'none';
    TelaAnimais.style.display = 'block';
    TelaPrincipal.style.display = 'none';
    carregarAnimais();
}

function telaAdotantes() {
    TelaAdocoes.style.display = 'none';
    TelaAdotantes.style.display = 'block';
    TelaAnimais.style.display = 'none';
    TelaPrincipal.style.display = 'none';
    carregarAdotantes();
}

function telaAdocoes() {
    TelaAdocoes.style.display = 'block';
    TelaAdotantes.style.display = 'none';
    TelaAnimais.style.display = 'none';
    TelaPrincipal.style.display = 'none';
}




function novaAdocao() {
    const dropdawNovaAdocao = document.getElementById('tela-principal-botao-nova-adocao');
    if (dropdawNovaAdocao.style.display == 'none') {
        dropdawNovaAdocao.style.display = 'block';
    } else {
        dropdawNovaAdocao.style.display = 'none';
    }
}







































































































async function carregarAnimais() {
    if (TelaAnimais.style.display !== 'block') {
        return; 
    }
    
    try {
        const response = await fetch(API_BASE_URL + '/api/animais/disponiveis');
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar animais: Status ${response.status}`);
        }
        
        const animais = await response.json();
        
        renderizarListaAnimais(animais);
        
    } catch (error) {
        console.error('Falha ao carregar animais:', error);
        window.alert('Não foi possível conectar ou buscar os animais disponíveis.');
    }
}

function renderizarListaAnimais(animais) {
    const tabelaBody = document.getElementById('tabela-corpo-animais'); 
    
    if (!tabelaBody) return; 
    
    tabelaBody.innerHTML = ''; 

    if (animais.length === 0) {
        const emptyRow = tabelaBody.insertRow();
        const cell = emptyRow.insertCell();
        cell.colSpan = 5; // as 5 colunas (ID, NOME, STATUS, IDADE, AÇÃO)
        cell.innerHTML = 'Nenhum animal disponível no momento.';
        cell.style.textAlign = 'center';
        return;
    }

    animais.forEach(animal => {
        // Cria uma nova linha na tabela
        const novaLinha = tabelaBody.insertRow();
        // Adiciona a classe de estilo
        novaLinha.classList.add('tela-animais-terceira-linha-div-tabela-tbody-tr');
        
        // Célula 1: ID
        novaLinha.insertCell().innerHTML = animal.id;
        
        // Célula 2: NOME
        novaLinha.insertCell().innerHTML = animal.nome;
        
        // Célula 3: STATUS 
        novaLinha.insertCell().innerHTML = animal.status;
        
        // Célula 4: IDADE
        novaLinha.insertCell().innerHTML = animal.idade;
        
        // Célula 5: AÇÃO (Botões de Editar/Excluir)
        const cellAcao = novaLinha.insertCell();
        cellAcao.innerHTML = `
            <div class="tela-animais-terceira-linha-div-tabela-tbody-tr-th-div">
                <div class="tela-animais-terceira-linha-div-tabela-tbody-tr-th-div-excluir" 
                     onclick="excluirAnimal(${animal.id})">EXCLUIR</div>
                <div class="tela-animais-terceira-linha-div-tabela-tbody-tr-th-div-editar" 
                     onclick="editarAnimal(${animal.id})">EDITAR</div>
            </div>
        `;
    });
}







function novoAnimal() {
    const dropdawNovoAnimal = document.getElementById("tela-animal-botao-novo-animal");
    
    if (dropdawNovoAnimal.style.display === 'none' || animalIdEmEdicao !== null) {
        limparFormularioAnimal(); 
        dropdawNovoAnimal.style.display = 'block';
    } else {
        dropdawNovoAnimal.style.display = 'none';
    }
}

function limparFormularioAnimal() {
    animalIdEmEdicao = null;
    document.getElementById('selectTipoDeAnimal').value = 'vazio';
    document.getElementById('nomeAnimalNovo').value = '';
    document.getElementById('idadeAnimalNovo').value = '';
    document.getElementById('pesoAnimalNovo').value = '';
    document.getElementById("racaAnimalNovo").value = '';
    document.getElementById("corDaPelagemAnimalNovo").value = '';

    document.getElementById('selectTipoDeAnimal').style.border = 'none';
    document.getElementById('nomeAnimalNovo').style.border = 'none';
    document.getElementById('idadeAnimalNovo').style.border = 'none';
    document.getElementById('pesoAnimalNovo').style.border = 'none';
    document.getElementById("racaAnimalNovo").style.border = 'none';
    document.getElementById("corDaPelagemAnimalNovo").style.border = 'none';

    document.querySelector('#tela-animal-botao-novo-animal .tela-animal-botao-novo-animal-titulo').textContent = 'Novo Animal';
    formularioNovoAnimal(); 
}


function formularioNovoAnimal() {
    const selectNovoAnimal = document.getElementById('selectTipoDeAnimal');
    const divRaca = document.getElementById("tela-animal-botao-novo-animal-campo-04");
    const divCorDaPelagem = document.getElementById("tela-animal-botao-novo-animal-campo-05")

    if (selectNovoAnimal.value == 'cachorro') {
        divRaca.style.display = 'block';
        divCorDaPelagem.style.display = 'none';
    } else if (selectNovoAnimal.value == 'gato') {
        divRaca.style.display = 'none';
        divCorDaPelagem.style.display = 'block';
    } else {
        divRaca.style.display = 'none';
        divCorDaPelagem.style.display = 'none';
    }
}

async function salvarAnimal() {
    const dropdawNovoAnimal = document.getElementById("tela-animal-botao-novo-animal");
    const selectNovoAnimal = document.getElementById('selectTipoDeAnimal');
    const inputNome = document.getElementById('nomeAnimalNovo');
    const inputIdade = document.getElementById('idadeAnimalNovo');
    const inputDescricaoPorte = document.getElementById('pesoAnimalNovo'); 
    const inputRaca = document.getElementById("racaAnimalNovo");
    const inputCorDaPelagem = document.getElementById("corDaPelagemAnimalNovo");

    let isValid = true;
    
    
    
    selectNovoAnimal.style.border = 'none';
    inputNome.style.border = 'none';
    inputIdade.style.border = 'none';
    inputDescricaoPorte.style.border = 'none';
    inputRaca.style.border = 'none';
    inputCorDaPelagem.style.border = 'none';


    if (selectNovoAnimal.value === 'vazio') {
        selectNovoAnimal.style.border = '2px solid red';
        isValid = false;
    }

    
    if (inputNome.value.trim() === '') {
        inputNome.style.border = '2px solid red';
        isValid = false;
    }

    
    const idade = parseInt(inputIdade.value);
    if (inputIdade.value.trim() === '' || isNaN(idade) || idade < 0) {
        inputIdade.style.border = '2px solid red';
        isValid = false;
    }
    
    
    const descricaoPorte = inputDescricaoPorte.value.trim();
    if (descricaoPorte === '') {
        inputDescricaoPorte.style.border = '2px solid red';
        isValid = false;
    }

    if (selectNovoAnimal.value === 'cachorro') {
        if (inputRaca.value.trim() === '') {
            inputRaca.style.border = '2px solid red';
            isValid = false;
        }
    } else if (selectNovoAnimal.value === 'gato') {
        if (inputCorDaPelagem.value.trim() === '') {
            inputCorDaPelagem.style.border = '2px solid red';
            isValid = false;
        }
    }


    if (!isValid) {
        window.alert('Preencha todos os campos obrigatórios corretamente.');
        return; 
    }
    
    let dadosAnimal = {
        nome: inputNome.value.trim(),
        idade: idade,
        porte: descricaoPorte, 
        status: "DISPONIVEL" 
    };

    if (selectNovoAnimal.value === 'cachorro') {
        dadosAnimal.raca = inputRaca.value.trim();
    } else if (selectNovoAnimal.value === 'gato') {
        dadosAnimal.corDaPelagem = inputCorDaPelagem.value.trim();
    }
    
    
    let url;
    let method;
    let successMessage;
    
    if (typeof animalIdEmEdicao !== 'undefined' && animalIdEmEdicao !== null) {
        url = API_BASE_URL + `/api/animais/${animalIdEmEdicao}`;
        method = 'PUT';
        successMessage = `Animal ID: ${animalIdEmEdicao} atualizado com sucesso!`;
    } else {
        url = API_BASE_URL + '/api/animais';
        method = 'POST';
        successMessage = `${selectNovoAnimal.value === 'cachorro' ? 'Cachorro' : 'Gato'} salvo com sucesso!`;
    }
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAnimal),
        });

        if (response.ok) {
            window.alert(successMessage);
            
            limparFormularioAnimal(); 
            dropdawNovoAnimal.style.display = 'none';
            carregarAnimais();

        } else {
            const errorText = await response.text();
            window.alert(`Erro ao salvar/atualizar o animal. Status: ${response.status}. Detalhes no console.`);
            console.error('Erro de Servidor: ', response.status, errorText);
        }
    } catch (error) {
        console.error('Erro de conexão: ', error);
        window.alert("Erro de conexão com a API (O Backend não está ligado?)");
    }
}







function excluirAnimal(id) {
    if (!confirm(`Tem certeza que deseja EXCLUIR o animal ID: ${id}?`)) {
        return; // Usuário cancelou
    }

    fetch(API_BASE_URL + `/api/animais/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        if (response.ok) {
            window.alert(`Animal ID: ${id} excluído com sucesso!`);
            // Recarrega a lista para remover o animal excluído da tela
            carregarAnimais(); 

        } else if (response.status === 404) {
            window.alert("Erro: Animal não encontrado (ID inválido ou já excluído).");
        } else {
            window.alert(`Erro ao excluir o animal. Status: ${response.status}`);
            console.error('Erro de servidor ao excluir: ', response.status);
        }
    }).catch(error => {
        console.error('Erro de conexão ao excluir:', error);
        window.alert("Erro de conexão com a API ao tentar excluir.");
    });
}





function formularioEditarAnimal() {
    const selectEditarAnimal = document.getElementById("EditarselectTipoDeAnimal");
    const EditarRaca = document.getElementById("tela-animal-botao-editar-animal-campo-04");
    const EditarCorDaPelagem = document.getElementById("tela-animal-botao-editar-animal-campo-05");

    if (selectEditarAnimal.value == 'cachorro') {
        EditarRaca.style.display = 'block';
        EditarCorDaPelagem.style.display = 'none';
    } else if (selectEditarAnimal.value == 'gato') {
        EditarRaca.style.display = 'none';
        EditarCorDaPelagem.style.display = 'block';
    } else {
        EditarRaca.style.display = 'none';
        EditarCorDaPelagem.style.display = 'none';
    }

}

function salvarEditarAnimal() {
    if (animalIdEmEdicao === null) {
        window.alert("Erro: Nenhum animal selecionado para edição.");
        return;
    }

    const selectTipo = document.getElementById('EditarselectTipoDeAnimal');
    const inputNome = document.getElementById('EditarNomeAnimal');
    const inputIdade = document.getElementById('EditarIdadeAnimal');
    const inputPorte = document.getElementById('EditarPorteAnimal');
    const inputRaca = document.getElementById("EditarRacaAnimal");
    const inputCorDaPelagem = document.getElementById("EditarCorDaPelagemAnimal");
    const dropdawEditarAnimal = document.getElementById("tela-animal-botao-editar-animal");

    
    if (selectTipo.value == 'vazio' || inputNome.value == '' || inputIdade.value == '' || inputPorte.value == '') {
        window.alert('Preencha os campos obrigatórios.');
        return;
    }

    let dadosAnimal = {
        nome: inputNome.value,
        idade: parseInt(inputIdade.value),
        porte: inputPorte.value,
        status: "DISPONIVEL"
    };

    if (selectTipo.value === 'cachorro') {
        if (inputRaca.value === '') { window.alert('Preencha a Raça.'); return; }
        dadosAnimal.raca = inputRaca.value;
    } else if (selectTipo.value === 'gato') {
        if (inputCorDaPelagem.value === '') { window.alert('Preencha a Cor da Pelagem.'); return; }
        dadosAnimal.corDaPelagem = inputCorDaPelagem.value;
    }

    // Chamada PUT para a API
    fetch(API_BASE_URL + `/api/animais/${animalIdEmEdicao}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAnimal),
    }).then(response => {
        if (response.ok) {
            window.alert(`Animal ID: ${animalIdEmEdicao} atualizado com sucesso!`);
            dropdawEditarAnimal.style.display = 'none'; 
            carregarAnimais(); 
            animalIdEmEdicao = null; // Limpa o ID em edição
        } else {
            window.alert("Erro ao atualizar animal! Verifique o console.");
            console.error('Erro de Servidor: ', response.status);
            return response.json().then(data => console.error(data));
        }
    }).catch(error => {
        console.error('Erro de conexão: ', error);
        window.alert("Erro de conexão com a API.");
    });
}


function editarAnimal(id) {
    animalIdEmEdicao = id; 

    const dropdawEditarAnimal = document.getElementById("tela-animal-botao-editar-animal");
    if (dropdawEditarAnimal) {
        dropdawEditarAnimal.style.display = 'block';
    }

    // 3. Busca dados do animal (GET)
    fetch(API_BASE_URL + `/api/animais/${id}`).then(response => {
            if (!response.ok) {
                throw new Error('Animal não encontrado.');
            }
            return response.json();
        }).then(animal => {
            // 4. Preenche os campos do formulário com os dados
            document.getElementById('EditarNomeAnimal').value = animal.nome;
            document.getElementById('EditarIdadeAnimal').value = animal.idade;
            document.getElementById('EditarPorteAnimal').value = animal.porte;

            const selectTipo = document.getElementById('EditarselectTipoDeAnimal');
            
            // se é Cachorro ou Gato
            if (animal.raca) {
                selectTipo.value = 'cachorro';
                document.getElementById('EditarRacaAnimal').value = animal.raca;
            } else if (animal.corDaPelagem) {
                selectTipo.value = 'gato';
                document.getElementById('EditarCorDaPelagemAnimal').value = animal.corDaPelagem;
            } else {
                selectTipo.value = 'vazio';
            }

            // Chama função para mostrar/esconder os campos de Raça/Pelagem
            formularioEditarAnimal(); 

        })
        .catch(error => {
            console.error('Erro ao carregar dados do animal para edição:', error);
            window.alert('Erro ao carregar dados. Verifique se o Backend está ativo.');
        });
}




















































function salvarNovaAdocao() {
    const inputAdotante = document.getElementById("searchAdotante");
    const inputAnimal = document.getElementById("searchAnimal");
    const dropdawNovaAdocao = document.getElementById("tela-principal-botao-nova-adocao");

    if (inputAdotante.value == '') {
        inputAdotante.style.border = '2px solid red';
    } else {
        inputAdotante.style.border = 'none';
    }

    if (inputAnimal.value == '') {
        inputAnimal.style.border = '2px solid red';
    } else {
        inputAnimal.style.border = 'none';
    }

    // dados para enviar
    let adotante = inputAdotante.value;
    let animal = inputAnimal.value;

    // Validação do servidor para salvar no banco de dados;

    if (inputAdotante.value != '' && inputAnimal.value != '') {
        window.alert("Salvo nova adoção");
        dropdawNovaAdocao.style.display = 'none';

        inputAdotante.value = '';
        inputAnimal.value = '';
    }

    
    // window.alert("salvar nova adoção");
    // aqui coleta todos os dados e envia para o banco de dados
    // Aqui faz as validaçoes se os campos não estão vazios
    // se tiver vazio -> mostrar mensagem de erro, que tem que preencher os campos acima
    // se tiver tudo OK -> coletar os dados, guardar nas variaveis e enviar em JSON
}









































































function novoAdotante() {
    const dropdawNovoAdotante = document.getElementById("tela-adotantes-botao-novo-adotante");
    
    // Se o formulário estiver oculto OU em modo de edição, exibe e limpa para criação
    if (dropdawNovoAdotante.style.display === 'none' || adotanteIdEmEdicao !== null) {
        limparFormularioAdotante(); // Garante que está limpo e no modo de Criação
        dropdawNovoAdotante.style.display = 'block';
    } else {
        // Se já estiver aberto e no modo de Criação, esconde
        dropdawNovoAdotante.style.display = 'none';
    }
}


async function salvarAdotante() {
    const nome = document.getElementById('nomeAdotanteNovo').value.trim();
    const cpf = document.getElementById('cpfAdotanteNovo').value.trim();
    const endereco = document.getElementById('enderecoAdotanteNovo').value.trim();

    let isValid = true;
    
    const inputNome = document.getElementById('nomeAdotanteNovo');
    const inputCpf = document.getElementById('cpfAdotanteNovo');
    const inputEndereco = document.getElementById('enderecoAdotanteNovo');

    inputNome.style.border = 'none';
    inputCpf.style.border = 'none';
    inputEndereco.style.border = 'none';

    if (nome === '') {
        inputNome.style.border = '2px solid red';
        isValid = false;
    }
    if (cpf.length !== 11) {
        inputCpf.style.border = '2px solid red';
        isValid = false;
    }
    if (endereco === '') {
        inputEndereco.style.border = '2px solid red';
        isValid = false;
    }

    if (!isValid) {
        window.alert("Por favor, preencha todos os campos corretamente (CPF deve ter 11 dígitos).");
        return; 
    }

    const adotanteData = {
        nome: nome,
        cpf: cpf,
        endereco: endereco,
        quantidadeDeAnimaisAdotados: 0 
    };

    let url = API_BASE_URL + '/api/adotantes';
    let method = 'POST';
    let successMessage = 'Adotante cadastrado com sucesso!';

    // Se estiver em modo de edição:
    if (adotanteIdEmEdicao !== null) {
        url = API_BASE_URL + `/api/adotantes/${adotanteIdEmEdicao}`;
        method = 'PUT';
        successMessage = 'Adotante atualizado com sucesso!';
        
        adotanteData.id = adotanteIdEmEdicao; 
    }


    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adotanteData),
        });

        if (response.ok) {
            window.alert(successMessage);
            
            limparFormularioAdotante();
            carregarAdotantes();
            
        } else if (response.status === 404 && method === 'PUT') {
            window.alert('Erro: Adotante não encontrado para atualização.');
        } else {
            const errorText = await response.text();
            window.alert(`Erro ao salvar/atualizar adotante. Status: ${response.status}\nDetalhes: ${errorText.substring(0, 100)}...`);
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        window.alert("Erro de conexão com a API. Verifique se o Backend está ligado.");
    }
}

async function carregarAdotantes() {
    const tabelaCorpo = document.getElementById('tabela-corpo-adotantes');
    if (!tabelaCorpo) {
        return;
    }
    
    tabelaCorpo.innerHTML = '';
    
    try {
        const response = await fetch(API_BASE_URL + '/api/adotantes');
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const adotantes = await response.json();
        
        adotantes.forEach(adotante => {
            const novaLinha = tabelaCorpo.insertRow();
            
            // 1. ID
            novaLinha.insertCell().textContent = adotante.id;
            
            // 2. NOME
            novaLinha.insertCell().textContent = adotante.nome;
            
            // 3. CPF
            novaLinha.insertCell().textContent = adotante.cpf;
            
            // 4. ENDEREÇO
            novaLinha.insertCell().textContent = adotante.endereco;
            
            // 5. ADOTADOS 
            novaLinha.insertCell().textContent = adotante.quantidadeDeAnimaisAdotados;

            // 6. AÇÕES (Botões)
            const celulaAcoes = novaLinha.insertCell();
            
            // Botão EDITAR
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.classList.add('btn', 'btn-editar');
            
            btnEditar.onclick = () => iniciarEdicaoAdotante(adotante.id);
            celulaAcoes.appendChild(btnEditar);
            
            // Botão EXCLUIR
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('btn', 'btn-excluir');
            // IMPORTANTE: Passa o ID para a função de exclusão
            btnExcluir.onclick = () => excluirAdotante(adotante.id, adotante.nome);
            celulaAcoes.appendChild(btnExcluir);
        });

    } catch (error) {
        console.error('Erro ao carregar adotantes:', error);
        window.alert('Não foi possível carregar a lista de adotantes. Verifique o console.');
    }
}



async function excluirAdotante(id, nome) {
    if (!confirm(`Tem certeza que deseja excluir o adotante: ${nome} (ID: ${id})?`)) {
        return; 
    }

    try {
        const response = await fetch(API_BASE_URL + `/api/adotantes/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            // 204 No Content - Sucesso na exclusão
            window.alert(`Adotante ${nome} excluído com sucesso!`);
            carregarAdotantes(); 
            
        } else if (response.status === 404) {
             // 404 Not Found - Não existe
            window.alert('Erro: Adotante não encontrado.');
            
        } else {
            window.alert(`Erro ao tentar excluir. Status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Erro de conexão ao excluir adotante:', error);
        window.alert('Erro de conexão com a API. Verifique se o Backend está ligado.');
    }
}

function limparFormularioAdotante() {
    const inputNome = document.getElementById('nomeAdotanteNovo');
    const inputCpf = document.getElementById('cpfAdotanteNovo');
    const inputEndereco = document.getElementById('enderecoAdotanteNovo');
    const dropdawNovoAdotante = document.getElementById("tela-adotantes-botao-novo-adotante");
    
    inputNome.value = '';
    inputCpf.value = '';
    inputEndereco.value = '';
    dropdawNovoAdotante.style.display = 'none';
    
    adotanteIdEmEdicao = null;
    document.getElementById('tituloAdotanteForm').textContent = 'Novo Adotante';
    
    inputNome.style.border = 'none';
    inputCpf.style.border = 'none';
    inputEndereco.style.border = 'none';
}

async function iniciarEdicaoAdotante(id) {
    adotanteIdEmEdicao = id;
    
    document.getElementById('tituloAdotanteForm').textContent = `Editar Adotante (ID: ${id})`;

    try {
        const response = await fetch(API_BASE_URL + `/api/adotantes/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar ID: ${response.status}`);
        }
        const adotante = await response.json();

        document.getElementById('nomeAdotanteNovo').value = adotante.nome;
        document.getElementById('cpfAdotanteNovo').value = adotante.cpf;
        document.getElementById('enderecoAdotanteNovo').value = adotante.endereco;
        document.getElementById("tela-adotantes-botao-novo-adotante").style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao iniciar edição:', error);
        window.alert('Não foi possível carregar os dados do adotante para edição.');
        limparFormularioAdotante();
    }
}