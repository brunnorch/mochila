const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
//verifica se o localStorage está vazio e cria um novo array
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//busca os dados do localStorage iterando e criando os elementos na <ul>
itens.forEach((elemento) => {
    adicionaItem(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();// interrompe o envio dos dados passado pelo form

    // captura o dado inserido no forms dinamicamente
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //verifica se o elemento já existe
    const existe = itens.find(elemento => elemento.nome === nome.value);

    //cria um objeto para salvar o nome e quantidade
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //item existe, atualiza a quantidade
    if (existe) {
        itemAtual.id = existe.id;
        atualizaItem(itemAtual);

        //GARANTE atualização do localStorage atraves do id do elemento
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }
    //se não, cria um id para novo item somando 1 ao ultimo id do array itens, caso array seja vazio, id = 0
    else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

        //realizar o processo de adicionar os itens na mochila
        adicionaItem(itemAtual);

        //insere o objeto criado acima dentro de um array para ser convertido em string através do JSON.stringfy()
        itens.push(itemAtual);
    }

    //adiciona o array convertido em string no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))

    //limpando a caixa do input após adicionar o item na mochila
    nome.value = "";
    quantidade.value = "";
})

function adicionaItem(item) {

    const novItem = document.createElement('li'); //Criei uma nova <li>
    novItem.classList.add('item'); //adicionei uma classe="item"
    //console.log(novItem) = <li class="item"></li>

    const quantidadeItem = document.createElement('strong')
    // <strong>QUANTIDADE DO ITEM</strong>
    quantidadeItem.innerHTML = item.quantidade;
    //cria um data-attribute para receber a posição do item no array
    quantidadeItem.dataset.id = item.id

    //Insere um elemento(quantidadeItem) criado por js dentro do outro elemento(novItem) criado criado por Js
    novItem.appendChild(quantidadeItem);

    // concatenando o elemento <li class="item"><strong>QUANTIDADE DO ITEM</strong></li> com o nome do item
    novItem.innerHTML += item.nome;
    //<li class="item"><strong>QUANTIDADE DO ITEM</strong>NOME DO ITEM</li> 

    //adiciona o botão para deletar item atraves da função passando o id do item
    novItem.appendChild(botaoDeleta(item.id));

    //POR FIM, adiciona todo o objeto criado por js dentro da <ul> 
    lista.appendChild(novItem)
}

function atualizaItem(item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
}

//Criação do botão
function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X";

    //evento de click chamando a função deletaItem e deletando o item através da tag <li>
    elementoBotao.addEventListener("click", function () {
        deletaItem(this.parentNode, id)
    })
    return elementoBotao
}

//parametro tag para remover o <li> e id para remover do localStorage
function deletaItem(tag, id) {
    tag.remove()

    //removendo do array atraves do INDEX do elemento.
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    //atualizando o localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
}