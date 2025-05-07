import { FastifyReply, FastifyRequest } from "fastify";
import { redisService } from "../services/redisService";
import { geminiRepository } from "../infrastructure/repository/geminiRepository";

export const redisController = {
    memoryCreator: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try {
            const { feedback, keyReturned } = request.body as { feedback?: string; keyReturned?: string };

            if (!keyReturned) {
                return reply.status(400).send({ error: 'Chave de cache não fornecida.' });
            }

            // Caso haja feedback,  resgata o cache
            if (feedback && keyReturned) {
                // Resgatando dados do cache
                const dataRescued = await redisService.getCache(keyReturned);

                // Verifica se o cache foi encontrado
                if (!dataRescued) {
                    return reply.status(404).send({ error: 'Cache não encontrado ou expirado.' });
                }

                // Registrando a interação no banco
                const geminiMemory = await geminiRepository.logAIInteraction(
                    dataRescued.userMessage,
                    dataRescued.builtQuery,
                    dataRescued.geminiResponse,
                    feedback
                );

                // Caso o registro falhe, retorna erro
                if (!geminiMemory) {
                    return reply.status(500).send({ error: 'Erro ao registrar interação no banco de dados.' });
                }

                return reply.send({
                    success: true,
                    message: 'Feedback registrado com sucesso.',
                });
            }

            // Caso o feedback não tenha sido fornecido
            return reply.status(400).send({ error: 'Feedback não fornecido.' });

        } catch (error) {
            console.error('Erro no redisController:', error);
            reply.status(500).send({
                error: 'Erro interno no processamento.',
                message: error || 'Erro desconhecido.',
            });
        }
    }
};
