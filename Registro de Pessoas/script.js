let contID = 0;

// Funções

function esvaziarDivAlert() {
    const alert = document.querySelector("#alert");
    alert.innerHTML = "";
};

function limparInputs(inputs = []) {
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

function criarRow(tBody, contID, nome, sobrenome, idade) {
    const tr = document.createElement("tr");

    const tdContID = document.createElement("td");
    const tdNome = document.createElement("td");
    const tdSobrenome = document.createElement("td");
    const tdIdade = document.createElement("td");

    tdContID.innerText = contID;
    tdNome.innerText = nome;
    tdSobrenome.innerText = sobrenome;
    tdIdade.innerText = idade;

    tr.appendChild(tdContID);
    tr.appendChild(tdNome);
    tr.appendChild(tdSobrenome);
    tr.appendChild(tdIdade);

    tBody.appendChild(tr);
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
        const TBodyRegistrosPessoas = document.querySelector("#registrosPessoas > tbody");

        criarRow(TBodyRegistrosPessoas, contID, nome.value, sobrenome.value, idade.value);

        contID++;

        const mensagemSucesso = criarAlerta("alert-success", "Registro concluído com sucesso!");

        alert.appendChild(mensagemSucesso);

        limparInputs([nome, sobrenome, idade]);
    }

    else {
        const mensagemErro = criarAlerta("alert-danger", "Algum dos campos não está preenchido, preencha e tente novamente!");

        alert.appendChild(mensagemErro);
    };
});

// Tabela dos registros

const registrosPessoas = document.querySelector("#registrosPessoas");

// --------------------------------- INSERIR --------------------------------- \\



// Badge (Nav pill)

const registrarERegistros = document.querySelector("#registrarERegistros");

const navPillsButtons = registrarERegistros.querySelectorAll("li > a");

const registrarButton = registrarERegistros.querySelector("#registrar");

const registrosButton = registrarERegistros.querySelector("#registros");

navPillsButtons.forEach(button => {
    button.addEventListener("click", () => {
        esvaziarDivAlert();

        registrarButton.classList.toggle("active");
        registrosButton.classList.toggle("active");
    
        tituloRegistrar.classList.toggle("d-none");
    
        registrarPessoa.classList.toggle("d-none");
      
        if (button.id == "registros") {
            const registrosTBody = registrosPessoas.querySelector("table > tbody");

            const temRegistro = registrosTBody.rows.length > 0;

            if (temRegistro) {
                tituloRegistros.classList.toggle("d-none");
                registrosPessoas.classList.toggle("d-none"); 
            }

            else {
                const alert = document.querySelector("#alert");
                
                const mensagemErro = criarAlerta("alert-danger", "Nenhum registro encontrado!");

                alert.appendChild(mensagemErro);

                registrarButton.addEventListener("click", () => {
                    tituloRegistros.classList.add("d-none");
                    registrosPessoas.classList.add("d-none"); 
                });
            };
        };
    });
});

