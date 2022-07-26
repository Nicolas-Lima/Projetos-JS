const pessoas = [];

let contID = 0;

// Funções

function esvaziarDivAlert() {
    const alert = document.querySelector("#alert");
    alert.innerHTML = "";
};

function limparInputs(...inputs) {
    inputs.forEach(input => {
        input.value = "";
    });
};

function criarAlerta(tipo, mensagem) {
    const alerta = document.createElement("div");
    alerta.classList.add("alert", tipo);
    alerta.setAttribute("role", "alert");
    alerta.innerText = mensagem;

    return alerta;
};

function mostrarRegistros(TBody) {
    pessoas.forEach(pessoa => {
        const tr = document.createElement("tr");
        tr.id = `pessoa-${pessoa.id}`;

        const atributos = Object.keys(pessoa);

        atributos.forEach(atributo => {
            const td = document.createElement("td");
            td.innerText = pessoa[atributo];

            tr.appendChild(td);
        });

        // Ação de excluir

        const tdAcoes = document.createElement("td");

        tdAcoes.innerHTML = `
        <button type="button" class="btn border-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash link-danger" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>
        </button>`;

        const buttonExcluir = tdAcoes.querySelector("button");

        buttonExcluir.addEventListener("click", () => {
            deletarRegistro(TBody, pessoa.id);
        });

        tr.appendChild(tdAcoes);

        TBody.appendChild(tr);
    });
};

function deletarRegistro(TBody, id) {
    pessoas.forEach(pessoa => {
        if (pessoa.id == id) {
            const index = pessoas.indexOf(pessoa);
            
            pessoas.splice(index, 1);
        };
    });

    //// ARRUMAR //////////
    trRegistro = TBody.querySelector(`tr#pessoa-${id}`);
    TBody.removeChild(trRegistro);

    if(!pessoas.length) {
        document.querySelector("table#registrosPessoas").classList.add("d-none");
    }
};

// Titulos

const tituloRegistrar = document.querySelector("#tituloRegistrar");
const tituloRegistros = document.querySelector("#tituloRegistros");

// Formulário registrar pessoa

const registrarPessoa = document.querySelector("#registrarPessoa");

registrarPessoa.addEventListener("submit", (e) => {
    e.preventDefault();

    const alert = document.querySelector("#alert");
    esvaziarDivAlert();

    const nome = registrarPessoa.querySelector("#nomePessoa");
    const sobrenome = registrarPessoa.querySelector("#sobrenomePessoa");
    const idade = registrarPessoa.querySelector("#idadePessoa");

    const nomeValido = !!(nome.value);
    const sobrenomeValido = !!(sobrenome.value);
    const idadeValida = !!(idade.value);

    if (nomeValido && sobrenomeValido && idadeValida) {
        pessoas.push({id: contID, nome: nome.value, sobrenome: sobrenome.value, idade: idade.value});

        contID++;

        const mensagemSucesso = criarAlerta("alert-success", "Registro concluído com sucesso!");

        alert.appendChild(mensagemSucesso);

        limparInputs(nome, sobrenome, idade);
    }

    else {
        const mensagemErro = criarAlerta("alert-danger", "Algum dos campos não está preenchido, preencha e tente novamente!");

        alert.appendChild(mensagemErro);
    };
});

// Tabela dos registros

const registrosPessoas = document.querySelector("#registrosPessoas");

// Badge (Nav pill)

const registrarERegistros = document.querySelector("#registrarERegistros");

const registrarButton = registrarERegistros.querySelector("#registrar");

const registrosButton = registrarERegistros.querySelector("#registros");

registrarButton.addEventListener("click", () => {
    if (!registrarButton.classList.contains("active")) {
        esvaziarDivAlert();

        registrosButton.classList.toggle("active");
        registrarButton.classList.toggle("active");

        tituloRegistros.classList.add("d-none");
        registrosPessoas.classList.add("d-none");

        tituloRegistrar.classList.toggle("d-none");
        registrarPessoa.classList.toggle("d-none");
    };
})

registrosButton.addEventListener("click", () => {
    if (!registrosButton.classList.contains("active")) {
        esvaziarDivAlert();

        registrarButton.classList.toggle("active");
        registrosButton.classList.toggle("active");

        tituloRegistrar.classList.toggle("d-none");
        registrarPessoa.classList.toggle("d-none");

        const TBodyRegistrosPessoas = registrosPessoas.querySelector("tbody");

        if (!!pessoas.length) {
            registrosPessoas.classList.toggle("d-none");

            mostrarRegistros(TBodyRegistrosPessoas);

            registrarButton.addEventListener("click", () => {
                TBodyRegistrosPessoas.innerHTML = "";
            });
        }

        else {
            const alert = document.querySelector("#alert");
            
            const mensagemErro = criarAlerta("alert-danger", "Nenhum registro encontrado!");
    
            alert.appendChild(mensagemErro);
        };
    };
});
