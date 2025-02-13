import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import numpy as np

def Anomalyprediction(responseData):

    df = pd.read_csv("dados_sensores.csv")

    X = df.drop(columns=["Estado da Maquina", "Timestamp"])
    y = df["Estado da Maquina"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    modelo = RandomForestClassifier(n_estimators=100, random_state=42)
    modelo.fit(X_train, y_train)

    y_pred = modelo.predict(X_test)
    
    castingNumpy = np.array(responseData).reshape(1, -1)  # Transformar em uma matriz 2D com uma única linha

    predicao = modelo.predict(castingNumpy)

    return predicao[0]
