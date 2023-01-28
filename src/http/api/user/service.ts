import { Request, Response } from 'express';
import { prisma } from '~/app';
import BaseService from '~/http/common/baseService';

class UserService extends BaseService {
    async users(res: Request) {
        return prisma.user.findMany();
    }
}
export default UserService;
