import { Request, Response } from 'express';
import BaseService from './baseService';

class UserService extends BaseService {
  async users(res: Request) {
    return this.prisma.users.findMany();
  }
}
export default UserService;
