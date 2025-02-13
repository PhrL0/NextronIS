from flask import Flask, jsonify, g
import random
import sqlite3
from datetime import datetime

app = Flask(__name__)
DATABASE = 'dados_sensores.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.route('/dados', methods=['GET'])
def get_data():
    dados = generate_data()
    
    # Insere os dados no banco
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO leituras 
        (temperatura, corrente, rotacao, vibracao, data_hora)
        VALUES (?, ?, ?, ?, ?)
    ''', (dados['temperatura'], 
          dados['corrente'], 
          dados['rotacao'], 
          dados['vibracao'], 
          datetime.now()))
    
    db.commit()
    
    print("Dados armazenados:", dados)
    return jsonify(dados)

@app.route('/historico', methods=['GET'])
def get_historico():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('''
        SELECT * FROM leituras ORDER BY data_hora DESC
    ''')
    
    leituras = cursor.fetchall()
    
    # Converte para dicionário
    resultados = []
    for leitura in leituras:
        resultados.append({
            'id': leitura[0],
            'temperatura': leitura[1],
            'corrente': leitura[2],
            'rotacao': leitura[3],
            'vibracao': leitura[4],
            'data_hora': leitura[5]
        })
    
    return jsonify(resultados)

def generate_data():
    corrente = round(random.uniform(2.0, 10.0), 2)
    vibracao = round(random.uniform(0.0, 3.5), 2)
    rotacao = round(random.uniform(0.0, 5.5), 2)
    temperatura = round(random.uniform(30, 100), 2)

    return {
        "temperatura": temperatura,
        "corrente": corrente,
        "rotacao": rotacao,
        "vibracao": vibracao
    }

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)