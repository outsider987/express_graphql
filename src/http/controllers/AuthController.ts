import { IRoute, Request, Response } from 'express';
import AuthService from '../services/auth';
import Controller, { Methods } from './Controller';
import { prisma, Prisma, user } from '@prisma/client';
import { body } from 'express-validator';

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
        validation: [
          body(Prisma.UserScalarFieldEnum.email).isEmail().isString().isEmpty(),
          body(Prisma.UserScalarFieldEnum.username).isEmpty().isString(),
          body(Prisma.UserScalarFieldEnum.password)
            .isLowercase()
            .isUppercase()
            .isString(),
        ],
      },
    ];
  }
  async Register(req: Request, res: Response) {
    const authService = new AuthService();
    const dates = await authService.register(req);

    await res.json(dates);
  }
}

export default AuthController;
