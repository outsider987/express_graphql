import { Request, Response } from 'express';
import BaseService from '~/http/common/baseService';

class UserService extends BaseService {
    async users(res: Request) {
        return this.prisma.user.findMany();
    }
}
export default UserService;
