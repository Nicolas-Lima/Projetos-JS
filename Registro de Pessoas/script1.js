const pessoas = [];

// Funções

function esvaziarDivAlert() {
    const alert = document.querySelector("#alert");
    alert.innerHTML = "";
};

function limparInputs(inputs = []) {
    inputs.forEach(input => {
        input.value = "";
    });
}

function criarAlerta(tipo, mensagem) {
    const alerta = document.createElement("div");
    alerta.classList.add("alert", tipo);
    alerta.setAttribute("role", "alert");
    alerta.innerText = mensagem;

    return alerta;
}

// Titulos

const tituloRegistrar = document.querySelector("#tituloRegistrar");
const tituloConsultar = document.querySelector("#tituloConsultar");

// Forms

const registrarPessoaFisica = document.querySelector("#registrarPessoaFisica");
const consultarPessoaFisica = document.querySelector("#consultarPessoaFisica");

// Formulário registrar pessoa física

registrarPessoaFisica.addEventListener("submit", (e) => {
    e.preventDefault();

    const alert = document.querySelector("#alert");
    esvaziarDivAlert();

    const nome = registrarPessoaFisica.querySelector("#nomePessoa");
    const sobrenome = registrarPessoaFisica.querySelector("#sobrenomePessoa");
    const idade = registrarPessoaFisica.querySelector("#idadePessoa");

    const nomeValido = !!(nome.value);
    const sobrenomeValido = !!(sobrenome.value);
    const idadeValida = !!(idade.value);

    if (nomeValido && sobrenomeValido && idadeValida) {
        pessoas.push({nome: nome.value, sobrenome: sobrenome.value, idade: idade.value});

        const mensagemSucesso = criarAlerta("alert-success", "Registro concluído com sucesso!");

        alert.appendChild(mensagemSucesso);

        limparInputs([nome, sobrenome, idade]);
    }

    else {
        const mensagemErro = criarAlerta("alert-danger", "Algum dos campos não está preenchido, preencha e tente novamente!");

        alert.appendChild(mensagemErro);
    };
});

// Formulário para consultar pessoa física

consultarPessoaFisica.addEventListener("submit", (e) => {
    e.preventDefault();

    const alert = document.querySelector("#alert");

    const nome = consultarPessoaFisica.querySelector("#nomePessoa");
    const sobrenome = consultarPessoaFisica.querySelector("#sobrenomePessoa");
    const idade = consultarPessoaFisica.querySelector("#idadePessoa");

    const resultadoConsulta = pessoas.filter(pessoa => {
        const mesmoNome = pessoa.nome == nome.value;
        const mesmoSobrenome = pessoa.sobrenome == sobrenome.value;
        const mesmaIdade = pessoa.idade == idade.value;

        if (mesmoNome && mesmoSobrenome && mesmaIdade) {
            return true;
        }

        else {
            return false;
        }
    });

    if (resultadoConsulta.length != 0) {
        nome.value = resultadoConsulta[0].nome;
        sobrenome.value = resultadoConsulta[0].sobrenome;
        idade.value = resultadoConsulta[0].idade;

        const DivResultadoConsulta = document.querySelector("#resultadoConsulta");

        DivResultadoConsulta.innerHTML = `
        <h3 class="mt-4">${nome.value} ${sobrenome.value}, ${idade.value} anos.<h3>
        `

        limparInputs([nome, sobrenome, idade]);
        esvaziarDivAlert();
    }

    else {
        const mensagemErro = criarAlerta("alert-danger", "Essa pessoa não está registrada ou os dados inseridos não correspondem ao que está no cadastro!");

        alert.appendChild(mensagemErro);
    }
});

// Badge (Nav pill)

const registrarConsultar = document.querySelector("#registrarConsultar");

const navPillsButtons = registrarConsultar.querySelectorAll("li > a");

const registrarButton = registrarConsultar.querySelector("#registrar");

const consultarButton = registrarConsultar.querySelector("#consultar");

navPillsButtons.forEach(button => {
    button.addEventListener("click", () => {
        esvaziarDivAlert();

        registrarButton.classList.toggle("active");
        consultarButton.classList.toggle("active");
    
        tituloRegistrar.classList.toggle("d-none");
        tituloConsultar.classList.toggle("d-none");
    
        registrarPessoaFisica.classList.toggle("d-none");
        consultarPessoaFisica.classList.toggle("d-none");  
        
        if (button.id == "registrar") {
            const DivResultadoConsulta = document.querySelector("#resultadoConsulta");
            DivResultadoConsulta.innerHTML = "";
        }
    });
});
