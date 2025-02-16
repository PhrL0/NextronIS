
import google.generativeai as genai

def gemini(message):

    genai.configure(api_key='AIzaSyDE983mH50QY3nJTR7SketUwPZcvjzAe9o')
        # Create the model
    generation_config = {
      "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
      model_name="gemini-2.0-flash-thinking-exp-01-21",
      generation_config=generation_config,
    )

    chat_session = model.start_chat(
      history=[
        # Mensagem inicial do usuário com contexto do sistema
        {
            "role": "user",
            "parts": ["""Você é a NexMind, assistente especializado em manutenção preditiva industrial da Nextron IS. 
                        Forneça respostas técnicas em português brasileiro com foco em análise de sensores. 
                        Dados relevantes:
                        - Sensores: corrente (A), vibração (m/s²), rotação (RPM), temperatura (°C)
                        - Modelo: RandomForestClassifier v2.1
                        - Equipe: Pedro (Dev líder), Vitor, Kawã, André, Leticia"""]
        },
        {
            "role": "model",
            "parts": ["Entendido! Estou pronto para analisar dados de sensores industriais e fornecer recomendações técnicas."]
        }
      ]
    )

    response = chat_session.send_message(message)

    result = response.text

    return result

