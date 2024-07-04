const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')



let minhaListaDeItems = []

function adicionarNovaTarefa() {
    // Verificar se o campo de entrada está vazio
    if (input.value.trim() ==='') {
        alert("Por favor, insira uma tarefa antes de adicionar!");
        return; // Retorna para evitar adicionar tarefas vazias à lista
    }
    // Adicionar nova tarefa à lista
    minhaListaDeItems.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = '' //Limpar o campo de entrada
    
    mostrarTarefas() // Atualizar a exibição das tarefas na lista
}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaDeItems.forEach((item, posicao) => {
        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            <img src="./images/checked.png" alt="check-in" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./images/trash.png" alt="tarefa-lixeira" onclick="deletarItem(${posicao})">
        </li>
            `
    })
    listaCompleta.innerHTML = novaLi
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItems))
}

function concluirTarefa(posicao) {
    minhaListaDeItems[posicao].concluida = !minhaListaDeItems[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItems.splice(posicao, 2)

    mostrarTarefas()
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if(tarefasDoLocalStorage) {
        minhaListaDeItems = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}


recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)