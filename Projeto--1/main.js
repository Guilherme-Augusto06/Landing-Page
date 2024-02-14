document.addEventListener('DOMContentLoaded', function() {
    const tabela = document.querySelector(".tabela-js");
  
    axios.get(`https://127.0.0.1:5000/list`)
      .then(function(resposta) {
        getData(resposta.data);
      })
      .catch(function(error) {
        console.error(error);
      });
  
    function getData(dados) {
      tabela.innerHTML = dados.map(item => `
          <tr>
          <th scope="row">${item.ID}</th>
          <td>${item.TAREFA}</td>
          <td><button class="btn bg-white delete-btn" type="button" data-bs-toggle="modal" data-bs-target="#modalDel"><span class="material-symbols-outlined text-danger">
          delete
          </span></button> <button class="btn bg-white edit-btn" id="edit-tarefa-btn"  type="button" data-bs-toggle="modal" data-bs-target="#modalEdit"><span class="material-symbols-outlined text-success">
          edit
          </span></button></td>
      </tr>`
      ).join('');
  
      todos_Eventos();
    }
  
    function todos_Eventos() {
      // ADICIONA EVENTO DE COMPRA PARA O BOTÃO "COMPRAR APPLE VISION"
      document.querySelector("#comprar_apple_vision").addEventListener("click", function() {
        const nomeProduto = "Apple Vision";
        adicionarProdutoAoCarrinho(nomeProduto);
      });

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
      axios.post(`https://127.0.0.1:5000/add`, { Tarefa: nomeProduto })
        .then(function() {
          alert(`O produto ${nomeProduto} foi adicionado ao carrinho.`);
          // Você pode adicionar qualquer outra lógica desejada após adicionar o produto ao carrinho
        })
        .catch(function(error) {
          console.error(error);
        });
    }
});
