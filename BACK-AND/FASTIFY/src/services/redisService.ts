import redis from "../config/redisCacher";

export const redisService = {
    saveCache: async (message: string, response: string, geminiHumanResponse:string, hashID:string): Promise<void> =>{
        
        //NÃO ESTÁ FUNCIONAL PRECISA ARRUMAR ISSO!
        const key = `dataInCache${hashID}`;

        //Criando um indice incremental para cada cache criado, que está sendo colocado no "array"
        const index = await redis.incr(`${key}:index`);
        const cacheKey = `${key}:${index}`;

        //RPUSH <- Estamos empilhando os caches, nunca os sobrescrevendo
        await redis.rpush(key,JSON.stringify({
            userMessage:message,
            builtQuery: response,
            geminiResponse:geminiHumanResponse,
        }));

        await redis.expire(cacheKey, 300);

    }
}