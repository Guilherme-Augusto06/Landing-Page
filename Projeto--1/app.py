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
  with open("Text.csv", "a", encoding='utf-8'
            ) as arquivo:  # Cria o arquivo Text.csv com leitura de UTF-8
    arquivo.write("ID,TAREFA\n")
except:
  pass


# Define a rota para listar as tarefas
@app.route("/list", methods=['GET'])
def listarTarefas():
  # Lê o arquivo Text.csv e converte para um dicionário
  tarefas = pd.read_csv('Text.csv')  # Lê o arquivo Text.csv
  tarefas = tarefas.to_dict(
      'records')  # Converte o DataFrame para um dicionário
  # Retorna as tarefas em formato JSON
  return jsonify(tarefas)


# Define a rota para adicionar uma tarefa
@app.route("/add", methods=['POST'])
def addTarefas():
  # Obtém a tarefa enviada pelo cliente
  item = request.json
  # Lê o arquivo Text.csv e converte para um DataFrame
  tarefas = pd.read_csv('Text.csv')

  # Define o ID da nova tarefa
  if tarefas.empty:
    id_tarefa = 1
  else:
    id_tarefa = tarefas['ID'].max() + 1

  # Adiciona a nova tarefa ao arquivo Text.csv  
  with open("Text.csv", "a", encoding='utf-8') as arquivo:  # Cria o arquivo Text.csv com leitura de UTF-8
    arquivo.write(f"{id_tarefa},{item['Tarefa']}\n")  # Escreve a nova tarefa no arquivo Text.csv

  # Lê o arquivo Text.csv e converte para um dicionário
  tarefas = pd.read_csv('Text.csv')  # Lê o arquivo Text.csv
  tarefas = tarefas.to_dict('records')  # Converte o DataFrame para um dicionário
  # Retorna as tarefas em formato JSON
  return jsonify(tarefas)




# Inicia a aplicação Flask
if __name__ == '__main__':
  app.run(debug=True, host="0.0.0.0")