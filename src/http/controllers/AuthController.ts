import { IRoute, Request, Response } from 'express';
import AuthService from '../services/auth';
import Controller, { Methods } from './Controller';
import { prisma, Prisma, users } from '@prisma/client';
import { body } from 'express-validator';
interface tt {
  test: string;
}
var modal = <tt>{};
// modal.
class AuthController extends Controller {
  constructor() {
    super();
    this.path = '/auth';
    this.routes = [
      {
        path: '/register',
        method: Methods.POST,
        handler: this.Register,
        validation: [body('').isEmail()],
      },
    ];
  }
  async Register(req: Request, res: Response) {
    const authService = new AuthService();
    const dates = await authService.register(req);
    res.send(dates);
  }
}

export default AuthController;
