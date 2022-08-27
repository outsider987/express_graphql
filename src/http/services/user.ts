import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';
import {METHODS} from 'http';
import Controller from '../controllers/Controller';
const prisma = new PrismaClient();

class UserService {
  constructor() {}
  async users(res: Request) {
    return prisma.users.findMany();
  }
}
export default UserService;
