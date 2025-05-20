import { Prisma, PrismaClient } from "@prisma/client";
import { create } from "domain";
const prisma = new PrismaClient();

export const geminiRepository = {
    fetchAllRecords: async(query: string): Promise<any[]> =>{
        const result = await prisma.$queryRawUnsafe(String(query));
        return result as any[]; 
    },
    logAIInteraction: async(askUser: string,
        buildQuery: string,
        humanResponse: string,
        userFeedback : number,
        hyperparameterArmId:string): Promise<any> =>{
        try{
            const result = await prisma.interacaoIA.create({
                data:{
                    perguntaUsuario:askUser,
                    queryMontada:buildQuery,
                    respostaHumanizada:humanResponse,
                    feedbackUsuario:userFeedback,
                    hyperparameterArmId:hyperparameterArmId
                }
            });

            return result;
        } catch(err) {
            console.error("Error",err);
        }
    }
}