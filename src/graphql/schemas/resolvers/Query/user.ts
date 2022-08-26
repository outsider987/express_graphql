import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Users={
    users:() => {

        return prisma.users.findMany({});
    },
    user:async (parent:any,data:any)=>
    {

        return prisma.users.findMany({where:{...data}})
    }
    }
export default  Users ;
