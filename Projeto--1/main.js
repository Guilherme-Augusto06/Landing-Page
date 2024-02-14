document.addEventListener('DOMContentLoaded', function() {
    todos_Eventos(); // Chame a função para adicionar os eventos após o carregamento do DOM
    atualizarContadorCarrinho(); // Atualiza o contador do carrinho ao carregar a página
    listarProdutosNoCarrinho(); // Lista os produtos do carrinho na modal
});

function todos_Eventos() {
    // ADICIONA EVENTO DE COMPRA PARA TODOS OS BOTÕES DE COMPRA
    document.querySelectorAll(".compra button").forEach(function(button) {
        button.addEventListener("click", function() {
            const produto = {
                marca: this.parentNode.querySelector("#nome").textContent,
                descricao: this.parentNode.querySelector("#descricao").textContent,
                valor: parseFloat(this.parentNode.querySelector("#valor").textContent.replace("R$ ", ""))
            };
            adicionarProdutoAoCarrinho(produto);
        });
    });

    // ADICIONA EVENTO PARA ABRIR MODAL DE CARRINHO
    document.querySelector("#abrirModalCarrinho").addEventListener("click", function() {
        document.getElementById("modalCarrinho").style.display = "block";
    });

    // ADICIONA EVENTO PARA FECHAR MODAL DE CARRINHO
    document.querySelector(".fecharModalCarrinho").addEventListener("click", function() {
        document.getElementById("modalCarrinho").style.display = "none";
    });
}

// Função para adicionar produto ao carrinho
function adicionarProdutoAoCarrinho(produto) {
    axios.post(`http://127.0.0.1:5000/add`, produto)
        .then(function() {
            alert(`O produto ${produto.marca} foi adicionado ao carrinho.`);
            // Atualiza o contador do carrinho
            atualizarContadorCarrinho();
            // Lista os produtos do carrinho na modal
            listarProdutosNoCarrinho();
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Função para atualizar o contador do carrinho
function atualizarContadorCarrinho() {
    axios.get(`http://127.0.0.1:5000/list`)
        .then(function(response) {
            const produtos = response.data;
            const contador = produtos.length;
            document.getElementById("carrinho-counter").textContent = contador;
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Função para listar os produtos do carrinho na modal
// Função para listar os produtos do carrinho na modal
function listarProdutosNoCarrinho() {
    axios.get(`http://127.0.0.1:5000/list`)
        .then(function(response) {
            const produtos = response.data;
            const modalBody = document.querySelector("#modalCarrinho .modal-body");
            modalBody.innerHTML = ""; // Limpa o conteúdo anterior

            produtos.forEach(function(produto) {
                const produtoHTML = `
                    <div class="item-carrinho">
                        <p><strong>Marca:</strong> ${produto.Marca}</p>
                        <p><strong>Descrição:</strong> ${produto.Descrição}</p>
                        <p><strong>Valor:</strong> R$ ${produto.Valor.toFixed(2)}</p>
                    </div>
                `;
                modalBody.innerHTML += produtoHTML;
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}
