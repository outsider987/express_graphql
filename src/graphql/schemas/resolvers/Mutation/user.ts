import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const User = {
    signup: async (parent: any, userData: any, context: any, info: any) => {
        try {
            const password = await bcrypt.hash(userData.password, 10);

            const user = await prisma.users.create({ data: { ...userData, password } });
           
            const token = jwt.sign({ userId: user.id }, '0');
            console.log(`create ${JSON.stringify( user)}`)
            return {
                token,
                user,
            };
            
        } catch (error) {
            console.log(error);
        }
       
    },
};

export default User;
