import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'

const key = 'AIzaSyA8-wEOS87jCzlvnWknnqA-tRd0valJWdg'

const generationConfig: GenerationConfig = {
    temperature: 0.9,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: "text/plain",
};
const genAI = new GoogleGenerativeAI(key)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21",generationConfig})


export const geminiService = {
    askGemini: async (message: string): Promise<string> =>{
        
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Oi, eu tenho 2 cachorros em casa" }],
                },
                {
                    role: "model",
                    parts: [{ text: "Prazer em conhecê-lo. O que você gostaria de saber?" }],
                },
            ]
        });

        const result = await chat.sendMessage(message)
        const response = await result.response
    
        return response.text()
    }
}
