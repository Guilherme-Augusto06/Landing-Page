document.addEventListener('DOMContentLoaded', function() {
    todos_Eventos(); // Chame a função para adicionar os eventos após o carregamento do DOM
});

function todos_Eventos() {

    // ADICIONA EVENTOS DE COMPRA PARA CADA OUTRO BOTÃO DE COMPRAR
    const botoesComprar = document.querySelectorAll('.compra button');
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', function() {
            const nomeProduto = this.parentElement.querySelector('h3').textContent;
            adicionarProdutoAoCarrinho(nomeProduto);
        });
    });
}

function adicionarProdutoAoCarrinho(nomeProduto) {
    axios.post(`http://127.0.0.1:5000/add`, { Tarefa: nomeProduto })
        .then(function() {
            alert(`O produto ${nomeProduto} foi adicionado ao carrinho.`);
            // Você pode adicionar qualquer outra lógica desejada após adicionar o produto ao carrinho
        })
        .catch(function(error) {
            console.error(error);
        });
}
