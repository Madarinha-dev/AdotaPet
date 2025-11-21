const TelaPrincipal = document.getElementById("tela-principal");
const TelaAnimais = document.getElementById("tela-animais");
const TelaAdocoes = document.getElementById("tela-adocoes");
const TelaAdotantes = document.getElementById("tela-adotantes");

// URL base da API Spring Boot rodando localmente
const API_BASE_URL = 'http://localhost:8080';

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
}

function telaAdotantes() {
    TelaAdocoes.style.display = 'none';
    TelaAdotantes.style.display = 'block';
    TelaAnimais.style.display = 'none';
    TelaPrincipal.style.display = 'none';
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

function novoAnimal() {
    const botaoNovoAnimal = document.getElementById('tela-animal-botao-novo-animal');
    const selectNovoAnimal = document.getElementById('selectTipoDeAnimal');
    const inputNome = document.getElementById('nomeAnimalNovo');
    const inputIdade = document.getElementById('idadeAnimalNovo');
    const inputPeso = document.getElementById('pesoAnimalNovo');
    // const divRaca = document.getElementById("tela-animal-botao-novo-animal-campo-04");
    const inputRaca = document.getElementById("racaAnimalNovo");
    // const divCorDaPelagem = document.getElementById("tela-animal-botao-novo-animal-campo-05");
    const inputCorDaPelagem = document.getElementById("corDaPelagemAnimalNovo");


    
    if (botaoNovoAnimal.style.display == 'block') {
        botaoNovoAnimal.style.display = 'none';
    } else {
        botaoNovoAnimal.style.display = 'block';
    }

    inputNome.value = '';
    inputIdade.value = '';
    inputPeso.value = '';
    inputRaca.value = '';
    inputCorDaPelagem.value = '';
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

function salvarAnimalNovo() {
    const dropdawNovoAnimal = document.getElementById("tela-animal-botao-novo-animal");
    const selectNovoAnimal = document.getElementById('selectTipoDeAnimal');
    const inputNome = document.getElementById('nomeAnimalNovo');
    const inputIdade = document.getElementById('idadeAnimalNovo');
    const inputPeso = document.getElementById('pesoAnimalNovo');
    // const divRaca = document.getElementById("tela-animal-botao-novo-animal-campo-04");
    const inputRaca = document.getElementById("racaAnimalNovo");
    // const divCorDaPelagem = document.getElementById("tela-animal-botao-novo-animal-campo-05");
    const inputCorDaPelagem = document.getElementById("corDaPelagemAnimalNovo");

    if (selectNovoAnimal.value == 'vazio') {
        selectNovoAnimal.style.border = '2px solid red';
    } else {
        selectNovoAnimal.style.border = 'none';
    }

    if (inputNome.value == '') {
        inputNome.style.border = '2px solid red';
    } else {
        inputNome.style.border = 'none';
    }

    if (inputIdade.value == '') {
        inputIdade.style.border = '2px solid red';
    } else {
        inputIdade.style.border = 'none';
    }

    if (inputPeso.value == '') {
        inputPeso.style.border = '2px solid red';
    } else {
        inputPeso.style.border = 'none';
    }

    if (selectNovoAnimal.value == 'cachorro') {
        if (inputRaca.value == '') {
            inputRaca.style.border = '2px solid red';
        } else {
            inputRaca.style.border = 'none';

            let tipoDeAnimal = selectNovoAnimal.value;
            let nome = inputNome.value;
            let idade = inputIdade.value;
            let peso = inputPeso.value;
            let raca = inputRaca.value;

            window.alert('Animal Salvo');
            
            dropdawNovoAnimal.style.display = 'none';
            

        }
    } else if (selectNovoAnimal.value == 'gato') {
        if (inputCorDaPelagem.value == '') {
            inputCorDaPelagem.style.border = '2px solid red';
        } else {
            inputCorDaPelagem.style.border = 'none';

            let tipoDeAnimal = selectNovoAnimal.value;
            let nome = inputNome.value;
            let idade = inputIdade.value;
            let peso = inputPeso.value;
            let CorDaPelagem = inputCorDaPelagem.value;

            window.alert('Animal Salvo');
            dropdawNovoAnimal.style.display = 'none';

        }
    }
}





function editarAnimal() {
    const dropdawEditarAnimal = document.getElementById("tela-animal-botao-editar-animal");
    const selectEditarAnimal = document.getElementById("EditarselectTipoDeAnimal");
    const inputNome = document.getElementById("EditarNomeAnimal");
    const inputIdade = document.getElementById("EditarIdadeAnimal");
    const inputPeso = document.getElementById("EditarPesoAnimal");
    const inputCorDaPelagem = document.getElementById("EditarCorDaPelagemAnimal");
    const inputRaca = document.getElementById("EditarRacaAnimal");

    if (dropdawEditarAnimal.style.display == 'none') {
        dropdawEditarAnimal.style.display = 'block';
    } else {
        dropdawEditarAnimal.style.display = 'none';
    }

    selectEditarAnimal.value = 'vazio';
    inputNome.value = '';
    inputCorDaPelagem.value = '';
    inputIdade.value = '';
    inputPeso.value = '';
    inputRaca.value = '';


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
    const dropdawEditarAnimal = document.getElementById("tela-animal-botao-editar-animal");
    const selectEditarAnimal = document.getElementById("EditarselectTipoDeAnimal");
    const inputNome = document.getElementById("EditarNomeAnimal");
    const inputIdade = document.getElementById("EditarIdadeAnimal");
    const inputPeso = document.getElementById("EditarPesoAnimal");
    const divCorDaPelagem = document.getElementById("tela-animal-botao-editar-animal-campo-05");
    const inputCorDaPelagem = document.getElementById("EditarCorDaPelagemAnimal");
    const divRaca = document.getElementById("tela-animal-botao-editar-animal-campo-04");
    const inputRaca = document.getElementById("EditarRacaAnimal");

    if (selectEditarAnimal.value == 'vazio') {
        selectEditarAnimal.style.border = '2px solid red';
    } else {
        selectEditarAnimal.style.border = 'none';
    }

    if (inputNome.value == '') {
        inputNome.style.border = '2px solid red';
    } else {
        inputNome.style.border = 'none';
    }

    if (inputIdade.value == '') {
        inputIdade.style.border = '2px solid red';
    } else {
        inputIdade.style.border = 'none';
    }

    if (inputPeso.value == '') {
        inputPeso.style.border = '2px solid red';
    } else {
        inputPeso.style.border = 'none';
    }

    if (selectEditarAnimal.value == 'cachorro') {
        if (inputRaca.value == '') {
            inputRaca.style.border = '2px solid red';
        } else {
            inputRaca.style.border = 'none';

            let tipoDeAnimal = selectEditarAnimal.value;
            let nome = inputNome.value;
            let idade = inputIdade.value;
            let peso = inputPeso.value;
            let raca = inputRaca.value;
            window.alert('Animal Editado.');
            dropdawEditarAnimal.style.display = 'none';
            

        }
    } else if (selectEditarAnimal.value == 'gato') {
        if (inputCorDaPelagem.value == '') {
            inputCorDaPelagem.style.border = '2px solid red';
        } else {
            inputCorDaPelagem.style.border = 'none';

            let tipoDeAnimal = selectEditarAnimal.value;
            let nome = inputNome.value;
            let idade = inputIdade.value;
            let peso = inputPeso.value;
            let CorDaPelagem = inputCorDaPelagem.value;

            window.alert('Animal Editado.');
            dropdawEditarAnimal.style.display = 'none';

        }
    }
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
    const inputNome = document.getElementById('nomeAdotanteNovo');
    const inputCpf = document.getElementById('cpfAdotanteNovo');
    const inputEndereco = document.getElementById('enderecoAdotanteNovo');

    
    if (dropdawNovoAdotante.style.display == 'none' || dropdawNovoAdotante.style.display == '') {
        dropdawNovoAdotante.style.display = 'block';
    } else if (dropdawNovoAdotante.style.display == 'block') {
        dropdawNovoAdotante.style.display = 'none';
    }

    inputCpf.value = '';
    inputEndereco.value = '';
    inputNome.value = '';
}

function salvarAdotanteNovo() {
    const inputNome = document.getElementById('nomeAdotanteNovo');
    const inputCpf = document.getElementById('cpfAdotanteNovo');
    const inputEndereco = document.getElementById('enderecoAdotanteNovo');
    const dropdawNovoAdotante = document.getElementById("tela-adotantes-botao-novo-adotante");

    if (inputCpf.value.length != 11) {
        inputCpf.style.border = '2px solid red';
    } else {
        inputCpf.style.border = 'none';
    }

    if (inputEndereco.value == '') {
        inputEndereco.style.border = '2px solid red';
    } else {
        inputEndereco.style.border = 'none';
    }

    if (inputNome.value == '') {
        inputNome.style.border = '2px solid red';
    } else {
        inputNome.style.border = 'none';
    }

    if (inputCpf.value != '' && inputEndereco.value != '' && inputNome.value != '') {
        let nome = inputNome.value;
        let endereco = inputEndereco.value;
        let cpf = inputCpf.value;
        dropdawNovoAdotante.style.display = 'none';

        inputCpf.value = '';
        inputEndereco.value = '';
        inputNome.value = '';
    }
}

function excluirAdotante() {
    window.alert('EXCLUIR ADOTANTE');
}

function editarAdotante() {
    const dropdawEditarAdotante = document.getElementById('tela-animal-botao-editar-adotante');
    
    if (dropdawEditarAdotante.style.display == '' || dropdawEditarAdotante.style.display == 'none') {
        dropdawEditarAdotante.style.display = 'block';
    } else if (dropdawEditarAdotante.style.display == 'block') {
        dropdawEditarAdotante.style.display = 'none';
    }
}

function salvarEditarAdotante() {
    const inputEditarNome = document.getElementById('EditarNomeAdotante');
    const inputEditarCpf = document.getElementById('editarCpfAdotante');
    const inputEditarEndereco = document.getElementById("EditarEnderecoAdotante");
    const dropdawEditarAdotante = document.getElementById('tela-animal-botao-editar-adotante');

    if (inputEditarCpf.value.length != 11) {
        inputEditarCpf.style.border = '2px solid red';
    } else {
        inputEditarCpf.style.border = 'none';
    }

    if (inputEditarEndereco.value == '') {
        inputEditarEndereco.style.border = '2px solid red';
    } else {
        inputEditarEndereco.style.border = 'none';
    }

    if (inputEditarNome.value == '') {
        inputEditarNome.style.border = '2px solid red';
    } else {
        inputEditarNome.style.border = 'none';
    }

    if (inputEditarCpf.value != '' && inputEditarEndereco.value != '' && inputEditarNome != '') {
        let cpf = inputEditarCpf.value;
        let endereco = inputEditarEndereco.value;
        let nome = inputEditarNome.value;

        dropdawEditarAdotante.style.display = 'none';

        inputEditarCpf.value = '';
        inputEditarEndereco.value = '';
        inputEditarNome.value = '';

    }
}