import { wsHandler } from '../websocket/wsHandler'
import { geminiService } from '../services/geminiService'
import { FastifyReply, FastifyRequest } from 'fastify'
import {queryGeminiValidator} from '../validation/queryGeminiValidator'
import { helper } from '../utils/helper'
import { geminiRepository } from '../infrastructure/repository/geminiRepository'

export const geminiController = {
   askGeminiController: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
       try {
           // if (!wsHandler.existsClient()) {
           //     return reply.status(400).send({ error: 'Nenhum cliente conectado.' });
           // }

           const { message } = request.body as { message: string };
           let moment: string;

           if (!message) {
               return reply.status(400).send({ error: 'Mensagem é obrigatório.' });
           } else{
                moment = helper.catchMoment();
           }

           const response = await geminiService.askGeminiSQL(message);

          
           if (!queryGeminiValidator.isSafeQuery(response)) {
               throw new Error("Query Insegura!");
           }

           const result = await geminiRepository.fetchAllRecords(response);
           const geminiHumanResponse = await geminiService.askGeminiHuman(JSON.stringify(helper.convertBigInt(result)));

        //    if(feedback){
        //        const geminiMemory = await geminiRepository.logAIInteraction(message, response, geminiHumanResponse, feedback);

        //        if (geminiMemory == null) {
        //           return reply.status(500).send({ error: 'Erro ao tentar criar memória' });
        //        }
        //     }

           return reply.send({
               success: true,
               message: 'Interação processada com sucesso',
               data: geminiHumanResponse
           });

       } catch (error) {
           console.error('Erro no geminiService:', error);
           reply.status(500).send({
               error: 'Erro interno ao processar a requisição',
               message: error || 'Erro desconhecido'
           });
       }
   }
};
