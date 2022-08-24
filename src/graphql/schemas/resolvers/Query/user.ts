import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Users={
    users:() => {

        return prisma.users.findMany({});
    },
    user:async (parent:any,data:any)=>
    {
        const {id}=data
        console.log(id);
        return prisma.users.findMany({where:{id}})
    }
    }
export default  Users ;
