# Importa as bibliotecas necessárias
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

# Cria a aplicação Flask
app = Flask(__name__)
CORS(app)

# Tenta criar o arquivo Text.csv caso ele não exista e escreve o cabeçalho
try:
    open('Text.csv', 'x')
    with open("Text.csv", "a", encoding='utf-8') as arquivo:
        # Cria o arquivo Text.csv com leitura de UTF-8
        arquivo.write("Valor,Marca,Descrição\n")
except:
    pass

# Define a rota para listar os produtos
@app.route("/list", methods=['GET'])
def listarProdutos():
    # Lê o arquivo Text.csv e converte para um dicionário
    produtos = pd.read_csv('Text.csv')
    # Converte o DataFrame para um dicionário
    produtos = produtos.to_dict('records')
    # Retorna os produtos em formato JSON
    return jsonify(produtos)

# Define a rota para adicionar um produto
# Define a rota para adicionar um produto
@app.route("/add", methods=['POST'])
def addProduto():
    # Obtém o produto enviado pelo cliente
    produto = request.json
    
    # Adiciona o produto ao arquivo Text.csv  
    with open("Text.csv", "a", encoding='utf-8') as arquivo:
        arquivo.write(f"{produto['valor']},{produto['marca']},{produto['descricao']}\n")
    
    # Lê o arquivo Text.csv e converte para um dicionário
    produtos = pd.read_csv('Text.csv')
    produtos = produtos.to_dict('records')
    
    # Retorna os produtos em formato JSON
    return jsonify(produtos)


# Inicia a aplicação Flask
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
