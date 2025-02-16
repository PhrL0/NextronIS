import sqlite3


conn = sqlite3.connect('sensores.db')
cursor = conn.cursor()


cursor.execute('''
    SELECT MIN(temperatura) AS min_temperatura, MAX(temperatura) AS max_temperatura, AVG(temperatura) AS avg_temperatura, MIN(vibracao) AS min_vibracao, MAX(vibracao) AS max_vibracao, AVG(vibracao) AS avg_vibracao, MIN(rotacao) AS min_rotacao, MAX(rotacao) AS max_rotacao, AVG(rotacao) AS avg_rotacao FROM sensores WHERE dt_Regis BETWEEN '2025-02-15 00:00:00' AND '2025-02-16 23:59:59'
''')

dados = cursor.fetchall()
conn.close()

for i in dados:
    print(i)


