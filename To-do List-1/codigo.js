let cont = 0

function campoAdicionarTarefa () {
    const campo_adicionar_tarefa = document.getElementById("adicionar-tarefa")
    campo_adicionar_tarefa.style.display = "block"
    const botao_adicionar_tarefa = document.getElementById("adicionar-tarefa1")
    botao_adicionar_tarefa.style.display = "none"
}

function AdicionarTarefa() {
    cont++
    const campo_nome_tarefa = document.getElementById("text")
    const nome_tarefa = campo_nome_tarefa.value || false
    campo_nome_tarefa.value = ""
    const campo_adicionar_tarefa = document.getElementById("adicionar-tarefa")
    campo_adicionar_tarefa.style = "display: none; margin-bottom: 50px;"
    const botao_adicionar_tarefa = document.getElementById("adicionar-tarefa1")
    botao_adicionar_tarefa.style.display = "flex"

    if (nome_tarefa != false) {
        (function CriarTarefa() {
            const tarefa = document.createElement("div")
            const id_tarefa = `tarefa-${cont}`
            tarefa.id = id_tarefa
            tarefa.className = "pendente"
            tarefa.style = "display: flex; align-items: center; justify-content: space-between;"

            const div2 = document.createElement("div")
            div2.style = "display: flex; align-items: center;"
            const checkbox = `<input type="checkbox" id="checkbox-tarefa${cont} style="margin-left: 5px;" onclick="concluir(${cont})">`
            const span = `<span id="span-nome-tarefa${cont}" style="font-size: 21px; margin-left: 5px;">${nome_tarefa}</span>`
            div2.innerHTML = checkbox + span
            
            const botao_lixeira = document.createElement("button")
            botao_lixeira.id = "botao-lixeira"
            botao_lixeira.setAttribute("onclick", `excluir(${cont})`)
            botao_lixeira.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>`

            const tarefas = document.getElementById("tarefas")
            tarefas.append(tarefa)
            tarefa.append(div2, botao_lixeira)
        })()
    }
}

function concluir(o) {
    const span_nome_tarefa = document.getElementById(`span-nome-tarefa${o}`)
    const id_tarefa = document.getElementById(`tarefa-${o}`)
    const nome_tarefa_style = window.getComputedStyle(span_nome_tarefa)
   
    if (nome_tarefa_style.textDecorationLine == "none") {
        span_nome_tarefa.style.textDecoration = "line-through"
        id_tarefa.className = "concluido"
    }

    else if (nome_tarefa_style.textDecorationLine == "line-through") {
        span_nome_tarefa.style.textDecoration = "none"
        id_tarefa.className = "pendente"
    }
}

function excluir(o) {
    const id_tarefa = document.getElementById(`tarefa-${o}`)
    id_tarefa.remove()
}

function mostrarTarefas() {
        if (window.valor_concluido == true) {
            mostrarConcluidos()
        }

        if (window.valor_pendente == true) {
            mostrarPendentes()
        }
}

function mostrarConcluidos() {
    const pendentes = document.body.getElementsByClassName("pendente")
    
    if (window.valor_pendente == true) {
        mostrarPendentes()
    }

    for (let i = 0; i < pendentes.length; i++) {
        const display = window.getComputedStyle(pendentes[i])
            
        if (display.display == "flex") {
            pendentes[i].style.display = "none"
            window.valor_concluido = true
        }

        else if (display.display == "none") {
            pendentes[i].style.display = "flex"
            window.valor_concluido = false
        }
    }
}

window.valor_concluido = undefined
window.valor_pendente = undefined

function mostrarPendentes() {
    const concluidos = document.body.getElementsByClassName("concluido")

    if (window.valor_concluido == true) {
        mostrarConcluidos()
    }

    for (let i = 0; i < concluidos.length; i++) {
        const display = window.getComputedStyle(concluidos[i])

        if (display.display == "flex") {
            concluidos[i].style.display = "none"
            window.valor_pendente = true
        }

        else if (display.display == "none") {
            concluidos[i].style.display = "flex"
            window.valor_pendente = false
        }
    }
}
