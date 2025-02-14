from flask import Flask, jsonify, request
from flask_cors import CORS
import random
from traningModel import Anomalyprediction  
from APIgemini import gemini

app = Flask(__name__)
CORS(app)

def getSensorData():
    corrente = round(random.uniform(2.0, 10.0), 2)
    vibracao = round(random.uniform(0.0, 3.5), 2)
    rotacao = round(random.uniform(0.0, 5.5), 2)
    temperatura = round(random.uniform(30, 100), 2)

    dados = [[corrente, vibracao, rotacao, temperatura]]

   
    statusInferido = Anomalyprediction(dados)

    return {
        "corrente": corrente,
        "vibracao": vibracao,
        "rotacao": rotacao,
        "temperatura": temperatura,
        "predicao": int(statusInferido)  
    }

@app.route('/sensores', methods=['GET'])
def sensores():
    return jsonify(getSensorData())

@app.route('/health')
def health_check():
    return jsonify({'status': 'healthy'}), 200

@app.route('/postGemini', methods=['POST','GET'])
def getDataFront():

    dados = request.json

    promptValue = dados.get('prompt')

    castingPrompt = str(promptValue)
    
    return jsonify(gemini(castingPrompt))

if __name__ == '__main__':
    app.run(debug=True)
