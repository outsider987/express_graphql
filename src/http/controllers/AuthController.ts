import { IRoute, Request, Response } from 'express';
import AuthService from '../services/auth';
import Controller, { Methods } from './Controller';
import { prisma, Prisma, user } from '@prisma/client';
import { body } from 'express-validator';
import { toResponse } from '../utils/response';
import { handleAuth } from '../middlewares/local/authHandler';

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
          body(Prisma.UserScalarFieldEnum.email).isEmail().isString().notEmpty(),
          body(Prisma.UserScalarFieldEnum.username).notEmpty().isString(),
          body(Prisma.UserScalarFieldEnum.password).isString(),
        ],
      },
      {
        path: '/login',
        method: Methods.POST,
        handler: this.Login,
      },
      {
        path: '/refresh',
        method: Methods.POST,
        handler: this.Refresh,
        localMiddleware: [handleAuth],
      },
      {
        path: '/test',
        method: Methods.POST,
        handler: this.Refresh,
        localMiddleware: [handleAuth],
      },
    ];
  }
  async Register(req: Request, res: Response) {
    const authService = new AuthService();
    const datas = await authService.register(req);
    res.json(toResponse(datas));
  }

  async Login(req: Request, res: Response) {
    const authService = new AuthService();
    const datas = await authService.login(req);
    res.json(toResponse(datas));
  }

  async Refresh(req: Request, res: Response) {
    const authService = new AuthService();
    const datas = await authService.login(req);
    res.json(toResponse(datas));
  }
}

export default AuthController;
