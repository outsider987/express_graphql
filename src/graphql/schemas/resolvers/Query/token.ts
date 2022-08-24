import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const tokenResolver = () => {
    return prisma.tokens.findMany();
};
export default tokenResolver;
