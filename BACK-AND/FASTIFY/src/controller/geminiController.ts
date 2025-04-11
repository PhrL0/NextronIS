import { wsHandler } from '../websocket/wsHandler'
import { geminiService } from '../services/geminiService'
import { FastifyReply, FastifyRequest } from 'fastify'

export const geminiController = {
    askGeminiController: async(request: FastifyRequest, reply: FastifyReply): Promise<void> =>{
       if(!wsHandler.existsClient()){
            return reply.status(400).send({error: 'Nenhum cliente conectado.'})
       }
       //Acessa o corpo da requisição e extrai apenas o campo {message}
       const {message} = request.body as {message: string}// <- TIPAGEM
       const response = await geminiService.askGemini(message)
       return reply.send({geminiResponse: response})
    }
}