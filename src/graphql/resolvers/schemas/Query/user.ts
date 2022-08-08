import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const userResolver =  () => {

    return prisma.users.findMany({});
};
export default userResolver;
