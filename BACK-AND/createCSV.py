import csv
import time
import random

csv_file = "dados_sensores.csv"

# Criar e escrever cabeçalhos apenas uma vez
with open(csv_file, mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Timestamp", "Corrente", "Vibracao", "Rotacao", "Temperatura", "Estado da Maquina"])

# Função para gerar o estado da máquina
def gerar_estado():
    prob = random.random()  # Número entre 0 e 1
    if prob <= 0.7:
        return 0  # Normal (70%)
    elif prob <= 0.9:
        return 1  # Atenção (20%)
    else:
        return 2  # Crítico (10%)

# Gerar dados e adicionar ao CSV
for _ in range(1000):  # Número de amostras
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    estado = gerar_estado()

    # Gerar valores randômicos dentro das faixas apropriadas para cada estado
    if estado == 0:  # Normal
        corrente = round(random.uniform(2.0, 5.0), 2)
        vibracao = round(random.uniform(0.0, 1.0), 2)
        temperatura = round(random.uniform(30, 60), 2)
    elif estado == 1:  # Atenção
        corrente = round(random.uniform(5.1, 7.0), 2)
        vibracao = round(random.uniform(1.1, 2.0), 2)
        temperatura = round(random.uniform(61, 80), 2)
    else:  # Crítico
        corrente = round(random.uniform(7.1, 10.0), 2)
        vibracao = round(random.uniform(2.1, 3.5), 2)
        temperatura = round(random.uniform(81, 100), 2)

    rotacao = round(random.uniform(0.0, 5.5), 2)  # Mantém aleatório

    # Abrir arquivo no modo append para não sobrescrever o cabeçalho
    with open(csv_file, mode="a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([timestamp, corrente, vibracao, rotacao, temperatura, estado])

print("CSV gerado com sucesso!")
