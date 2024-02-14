from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

csv_file = 'dados.csv'

# Inicializa o CSV se não existir
if not os.path.isfile(csv_file):
    with open(csv_file, 'x', encoding='utf-8') as arquivo:
        arquivo.write("NOME,MARCA,PRECO\n")

def obter_lista_itens():
    try:
        # Sempre lê o arquivo CSV para obter a lista atualizada
        if os.stat(csv_file).st_size == 0:
            lista_itens = []
        else:
            df = pd.read_csv(csv_file)
            lista_itens = df.values.tolist()
    except FileNotFoundError:
        lista_itens = []
    return lista_itens

@app.route("/")
def homepage():
    return render_template("index.html", lista_itens=obter_lista_itens())

@app.route("/adicionar_produto", methods=['POST'])
def adicionar_produto():
    try:
        nome = request.form['nome']
        marca = request.form['marca']
        preco = request.form['preco']

        with open(csv_file, "a", encoding='utf-8') as arquivo:
            arquivo.write(f"{nome},{marca},{preco}\n")

        # Obtemos a lista atualizada diretamente do arquivo CSV
        lista_itens = obter_lista_itens()

        return render_template("index.html", lista_itens=lista_itens)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)