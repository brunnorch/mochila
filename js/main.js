const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = [];

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //chamada da função para realizar o processo de adicionar os itens na mochila
    adicionaItem(nome.value, quantidade.value)

    //limpando a caixa do input após adicionar o item na mochila
    nome.value = "";
    quantidade.value = "";
})

function adicionaItem(nome, quantidade) {

    const novItem = document.createElement('li'); //Criei uma nova <li>
    novItem.classList.add('item'); //adicionei uma classe="item"
    //console.log(novItem) = <li class="item"></li>

    const quantidadeItem = document.createElement('strong')
    quantidadeItem.innerHTML = quantidade
    // <strong>QUANTIDADE DO ITEM</strong>

    //Insere um elemento(quantidadeItem) criado por js dentro do outro elemento(novItem) criado criado por Js
    novItem.appendChild(quantidadeItem);

    // concatenando o elemento <li class="item"><strong>QUANTIDADE DO ITEM</strong></li> com o nome do item
    novItem.innerHTML += nome;
    //<li class="item"><strong>QUANTIDADE DO ITEM</strong>NOME DO ITEM</li> 

    //POR FIM, adiciona todo o objeto criado por js dentro da <ul> 
    lista.appendChild(novItem)

    //cria um objeto para salvar o nome e quantidade
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    //insere o objeto criado acima dentro de um array para ser convertido em texto através do JSON.stringfy()
    itens.push(itemAtual);

    //adiciona o array convertido em string no localStorage
    localStorage.setItem("item", JSON.stringfy(itens))

}