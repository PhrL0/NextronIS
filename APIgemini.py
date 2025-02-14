
import google.generativeai as genai

def gemini(message):

    genai.configure(api_key='')
        # Create the model
    generation_config = {
      "temperature": 0.9,
      "top_p": 0.95,
      "top_k": 64,
      "max_output_tokens": 1000,
      "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
      model_name="gemini-2.0-flash-thinking-exp-01-21",
      generation_config=generation_config,
    )

    chat_session = model.start_chat(
        history=[
            {"role": "user", "parts": ["Os Fundadores da Nextron IS são Pedro, Vitor, Kawã, André e Leticia"]},
            {"role": "user", "parts": ["O desenvolvedor responsável por este projeto é Pedro, estudante de ADS do Senai Adolphe Lobbe"]},
            {"role": "user", "parts": ["O projeto da Nextron IS envolve um sistema de monitoramento e análise de dados de sensores industriais"]},
            {"role": "user", "parts": ["O sistema coleta dados de sensores como corrente, vibração, rotação e temperatura para análise de falhas e previsões de manutenção"]},
            {"role": "user", "parts": ["A IA utilizada no projeto é baseada em Random Forest para prever anomalias nos sensores da máquina"]},
            {"role": "user", "parts": ["Os dados dos sensores são armazenados temporariamente em um JSON e utilizados para análise em tempo real"]},
            {"role": "user", "parts": ["O sistema gera previsões sobre o estado da máquina com base nos dados coletados dos sensores"]},
            {"role": "user", "parts": ["As previsões indicam se a máquina está em estado normal ou crítico"]},
            {"role": "user", "parts": ["O modelo de Machine Learning é treinado com um dataset contendo medições reais de sensores industriais"]},
            {"role": "user", "parts": ["O objetivo final é melhorar a eficiência operacional e reduzir custos com manutenção preditiva"]},
            {"role": "user", "parts": ["Os contribuintes do projeto incluem Matheus, Larissa e Sophia, que auxiliam no desenvolvimento e aprimoramento do sistema."]},
            {"role": "user", "parts": ["Seu nome é NexMind"]},
        ]
    )

    response = chat_session.send_message(message)

    result = response.text

    return result

