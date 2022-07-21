// Buscando apenas um elemento pelo ID
document.getElementByid("nomeId")

// Buscando elementos pela Classe
document.getElementsByClassName("nomeClasse")

// Buscando elementos pela Tag

document.getElementsByTagName("a")

// Vendo qual o conteudo dentro de um ID, TAG, CLASSE..

let share = getElementByid("nomeId")

share.textContent

// Mudando o conteudo

share.innerText = "Share"

share.innerHTML = "<h1>Share</h1>" // Com HTML

// Mudando o estilo

share.style.backgroundColor = "white"

// Pega os filhos do elemento SHARE

share.children

// Removendo um elemento

share.remove()

// Criando um elemento

let h1 = document.createElement("h1")

// Adicionando elementos no body

document.body.append()

// Eventos