import { IRoute, Request, Response } from 'express';
import AuthService from '../services/auth';
import Controller, { Methods } from './Controller';
import { prisma, Prisma, user } from '@prisma/client';
import { body } from 'express-validator';
import { toResponse } from '../utils/response';

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
          body(Prisma.UserScalarFieldEnum.email)
            .isEmail()
            .isString()
            .notEmpty()
            .isLength({ max: 5 }),
          body(Prisma.UserScalarFieldEnum.username).notEmpty().isString(),
          body(Prisma.UserScalarFieldEnum.password).isString(),
        ],
      },
    ];
  }
  async Register(req: Request, res: Response) {
    const authService = new AuthService();
    const datas = await authService.register(req);
    res.json(toResponse(datas));
  }
}

export default AuthController;
