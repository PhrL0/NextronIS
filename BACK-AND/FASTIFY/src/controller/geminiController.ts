import { wsHandler } from '../websocket/wsHandler'
import { geminiService } from '../services/geminiService'
import { FastifyReply, FastifyRequest } from 'fastify'
import {queryGeminiValidator} from '../validation/queryGeminiValidator'
import { helper } from '../utils/helper'
import { geminiRepository } from '../infrastructure/repository/geminiRepository'
export const geminiController = {
    askGeminiController: async(request: FastifyRequest, reply: FastifyReply): Promise<void> =>{
       try{
        //    if(!wsHandler.existsClient()){
        //        return reply.status(400).send({error: 'Nenhum cliente conectado.'})
        //    }
          //Acessa o corpo da requisição e extrai apenas o campo {message}
          const {message} = request.body as {message: string}// <- TIPAGEM
          const response = await geminiService.askGeminiSQL(message)
   
          if(!queryGeminiValidator.isSafeQuery(response)){
               throw new Error("Query Insegura!")
          }
          const result = await geminiRepository.fetchAllRecords(response);
          const geminiHumanResponse = await geminiService.askGeminiHuman(JSON.stringify(helper.convertBigInt(result)));
          return reply.send({geminiHumanResponse})
       } catch (error){
        console.error('Erro no geminiService:', error);
        reply.status(500).send({ error: 'Erro interno ao processar a requisição' });
       }
    }
}