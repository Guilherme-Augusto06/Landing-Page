document.addEventListener('DOMContentLoaded', function() {
    todos_Eventos(); // Chame a função para adicionar os eventos após o carregamento do DOM
});

function todos_Eventos() {
    // ADICIONA EVENTO DE COMPRA PARA O BOTÃO "COMPRAR APPLE VISION"
    document.querySelector("#comprar_apple_vision").addEventListener("click", function() {
        const produto = {
            marca: "Apple Vision",
            descricao: "Óculos Virtual 256gb",
            valor: 23400.00
        };
        adicionarProdutoAoCarrinho(produto);
    });

    // ADICIONA EVENTO DE COMPRA PARA O BOTÃO "COMPRAR IPHONE"
    document.querySelector("#comprar_iphone").addEventListener("click", function() {
        const produto = {
            marca: "IPhone 15",
            descricao: "(128 GB) — Preto",
            valor: 6999.99
        };
        adicionarProdutoAoCarrinho(produto);
    });

    // ADICIONA EVENTO DE COMPRA PARA O BOTÃO "COMPRAR HEADSET"
    document.querySelector("#comprar_headset").addEventListener("click", function() {
        const produto = {
            marca: "Headset Gamer Razer Kraken",
            descricao: "Multi Platform Green P2, Verde, RZ.AU.KR.03.RT",
            valor: 699.99
        };
        adicionarProdutoAoCarrinho(produto);
    });

    // ADICIONA EVENTO DE COMPRA PARA O BOTÃO "COMPRAR CELULAR"
    document.querySelector("#comprar_celular").addEventListener("click", function() {
        const produto = {
            marca: "Smartphone Xiaomi Poco F5 Pro",
            descricao: "Dual Sim De 512gb / 12gb Ram De 6.67 Tela- Preto (global)",
            valor: 5999.99
        };
        adicionarProdutoAoCarrinho(produto);
    });

    // ADICIONA EVENTO DE COMPRA PARA O BOTÃO "COMPRAR ALEXA"
    document.querySelector("#comprar_alexa").addEventListener("click", function() {
        const produto = {
            marca: "Alexa",
            descricao: "Smart speaker com Alexa | Display de LED ainda melhor | Cor Azul Claro",
            valor: 599.99
        };
        adicionarProdutoAoCarrinho(produto);
    });

    // ADICIONA EVENTO DE COMPRA PARA O BOTÃO "COMPRAR MOUSE"
    document.querySelector("#comprar_mouse").addEventListener("click", function() {
        const produto = {
            marca: "Mouse Gamer Sem Fio Logitech G703",
            descricao: "Sensor HERO 25K e Bateria Recarregável - Compatível com POWERPLAY",
            valor: 699.99
        };
        adicionarProdutoAoCarrinho(produto);
    });
}

function adicionarProdutoAoCarrinho(produto) {
    axios.post(`http://127.0.0.1:5000/add`, produto)
        .then(function() {
            alert(`O produto ${produto.marca} foi adicionado ao carrinho.`);
            window.location.reload(); // Recarrega a página
        })
        .catch(function(error) {
            console.error(error);
        });
}

