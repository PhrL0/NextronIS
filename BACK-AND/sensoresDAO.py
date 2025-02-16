import sqlite3
import json

class SensoresDAO:
    def __init__(self, db_name="sensores.db"):
        self.db_name = db_name

    def insertDB(self, temperatura, corrente, rotacao, vibracao, dt_Regis, status):
        print(temperatura, corrente, rotacao, vibracao, dt_Regis, status)
        try:
            with sqlite3.connect(self.db_name) as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO sensores (temperatura, corrente, rotacao, vibracao, dt_Regis, status) 
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (temperatura, corrente, rotacao, vibracao, dt_Regis, status))
                conn.commit()
        except sqlite3.Error as e:
            print(f"Erro ao inserir dados: {e}")

    def selectDB(self,data):
        
        responseStartDate = data.get('startDate')
        responseEndDate = data.get('endDate')
        ArrayParameters = data.get('parameters', [])

        temperature = "temperatura" if 'temperature' in ArrayParameters else None
        vibration = "vibracao" if 'vibration' in ArrayParameters else None
        eletric_current = "corrente" if 'electric_current' in ArrayParameters else None
        rotation = "rotacao" if 'rotation' in ArrayParameters else None


        # Criar colunas para MIN, MAX e AVG
        stat_columns = []
        for col in [temperature, vibration, eletric_current, rotation]:
            if col:
                stat_columns.append(f"MIN({col}) AS min_{col}")
                stat_columns.append(f"MAX({col}) AS max_{col}")
                stat_columns.append(f"AVG({col}) AS avg_{col}")

        # Unir colunas na query
        columns_to_select = ", ".join(stat_columns)
        
        dynamicQuery = f"SELECT {columns_to_select} FROM sensores WHERE dt_Regis BETWEEN '{responseStartDate} 00:00:00' AND '{responseEndDate} 23:59:59' "
        
        print(dynamicQuery)
        try:
            with sqlite3.connect("sensores.db") as conn:
                conn.row_factory = sqlite3.Row  # Permite acessar os resultados como dicionário
                cursor = conn.cursor()
                cursor.execute(dynamicQuery)
                rows = cursor.fetchall()

                # Criar uma lista de dicionários para o JSON
                results = [dict(row) for row in rows]
                
                return results
            

        except sqlite3.Error as e:
            print(f"Erro ao buscar dados: {e}")
            return json.dumps({"erro": "Erro ao consultar banco de dados"})