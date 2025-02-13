from flask import Flask,jsonify
from flask_cors import CORS
import random
from traningModel import Anomalyprediction





app = Flask(__name__)

CORS(app)


def getSensorData():
    corrente = round(random.uniform(2.0, 10.0), 2)
    vibracao = round(random.uniform(0.0, 3.5), 2)
    rotacao = round(random.uniform(0.0, 5.5), 2)
    temperatura = round(random.uniform(30, 100), 2)

    dados = [[corrente,vibracao,rotacao,temperatura]]

    statusInferido = Anomalyprediction(dados)

    return {
        "corrente":corrente,
        "vibracao":vibracao,
        "rotacao":rotacao,
        "temperatura":temperatura,
        "predicao":int(statusInferido)
    }

@app.route('/sensores',methods=['GET'])
def sensores():
    return jsonify(getSensorData())

@app.route('/health')
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True)
