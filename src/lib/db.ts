// singleton pattern in development mode
import { PrismaClient, Prisma } from "@/lib/generated/prisma"; 
import { DefaultArgs } from "@/lib/generated/prisma/runtime/library";

const createSingletonPrismaClient = (): PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> => {
    const prismaClient = new PrismaClient();
    return prismaClient;
}

declare global {
    // eslint-disable-next-line no-var
    var prisma: ReturnType<typeof createSingletonPrismaClient> | undefined
}

const prisma = globalThis.prisma ?? createSingletonPrismaClient();

if(process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}

export default prisma;