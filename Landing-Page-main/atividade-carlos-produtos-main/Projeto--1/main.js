document.addEventListener('DOMContentLoaded', async function() {
    async function getProducts() {
        try {
            const result = await axios.get("http://127.0.0.1:5000/GET");
            console.log(result.data);
            return result.data;
        } catch (error) {
            console.error('Erro ao obter produtos:', error.message);
            throw error; // Você pode querer tratar o erro aqui ou lançá-lo para ser tratado fora desta função
        }
    }

    // Chama a função getProducts quando o DOM é carregado
    try {
        const products = await getProducts();
        console.log('Produtos:', products);
        // Faça algo com os produtos obtidos, como exibir na página
    } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
    }
});

async function addProduct() {
    const nomeId = document.getElementById('nome');
    const valorId = document.getElementById('valor');
    const descricaoId = document.getElementById('descricao');
}
//Adiciona um produto
    try {
        const result = await axios.post("http://127.0.0.1:5000/adicionar_produto", {
            nome: nomeId.value,
            valor: valorId.value,
            descricao: descricaoId.value
        });
        console.log(result.data);
        return result.data;
    }
    catch (error) {
        console.error('Erro ao adicionar produto:', error.message);
        throw error; // Você pode querer tratar o erro aqui ou lançá-lo para ser tratado fora desta função
    }
