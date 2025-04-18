import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const geminiRepository = {
    fetchAllRecords: async(query: string): Promise<any[]> =>{
        const result = await prisma.$queryRawUnsafe(String(query));
        return result as any[]; 
    }
}