import { FastifyReply,FastifyRequest } from "fastify"
export const redisController = {
    hashCreator: async (request: FastifyRequest, reply: FastifyReply): Promise<void> =>{
        try{
            const {feedback} = request.body as {feedback?: string};

              
        }
    }
}