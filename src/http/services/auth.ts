import { Request, Response } from 'express';
import BaseService from './baseService';
import jwt from 'jsonwebtoken';
import { users } from '@prisma/client';

class AuthService extends BaseService {
  async register(res: Request): Promise<users> {
    const { password } = res.body;

    return this.prisma.users.create({ data: { ...res.body } });
  }
}
export default AuthService;
