from APIgemini import gemini
from sensoresDAO import SensoresDAO

class Controller:
    
    def __init__(self):
        self.dao = SensoresDAO()
    
    def  selectAndReports(self, responseData):
       
        dataQuery = self.dao.selectDB(responseData)
        #dataQuery = {'min_temperatura': 44.45, 'max_temperatura': 92.75, 'avg_temperatura': 64.4675, 'min_vibracao': 2.04, 'max_vibracao': 2.82, 'avg_vibracao': 2.465, 'min_rotacao': 
        #0.83, 'max_rotacao': 1.88, 'avg_rotacao': 1.2625}
        
        prompt = f"""Analise os resultados da query SQL abaixo e gere um relatório técnico detalhado com insights acionáveis. Siga rigorosamente a estrutura e diretrizes:  

        **Contexto**: Você é um engenheiro de manutenção preditiva em uma fábrica. Os dados referem-se a sensores de máquinas.  

        **Dados da Query** (resultados em formato tabular):  
        {dataQuery}  

        **Instruções**:  
        1. **Resumo Estatístico**:   
           - Destaque valores fora dos limites operacionais (ex.: temperatura >85°C, vibração >6.0mm/s).  

        2. **Identificação de Anomalias**:  
           - Sinalize picos (ex.: se máximo estiver 40% acima da média).  
           - Marque com ❗ observações críticas (ex.: "❗Vibração máxima de 7.8mm/s: risco de falha no rolamento").  
           - 0: Normal 🟢 | 1: Alerta 🟡 (Monitorar) | 2: Crítico 🔴 (Agir Imediatamente)  

        3. **Correlações Técnicas**:  
           - Relacione variáveis (ex.: "Rotação elevada + vibração alta sugerem desbalanceamento").  

        4. **Recomendações**:  
           - Liste 3 a 5 ações prioritárias (ex.: "1. Verificar sistema de refrigeração da máquina X").  

        **Notas**:  
        - Se houver dados inválidos (ex.: rotação mínima 0 RPM), alerte.  
        - Use linguagem técnica, mas evite jargões excessivos.  
        - Formate a resposta em **4 seções** com títulos em negrito."""

        reports = gemini(prompt)

        return {"responseQuery":dataQuery,"insightGemini":reports}
    
    
    def controllerInsertDB(self,temperatura, corrente, rotacao, vibracao, dt_Regis, status):
        self.dao.insertDB(temperatura, corrente, rotacao, vibracao, dt_Regis, status)
