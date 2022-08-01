import { PrismaClient } from '@prisma/client';
// import { GraphQLObjectType } from 'graphql';
const prisma = new PrismaClient();
const userResolver =  () => {

    return prisma.users.findMany({});
};
export default userResolver;
