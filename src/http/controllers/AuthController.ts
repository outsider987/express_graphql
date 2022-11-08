import { TypedRequestBody } from './../utils/request';
import { IRoute, Request, Response } from 'express';
import AuthService from '../services/auth';
import Controller, { Methods } from './Controller';
import { prisma, Prisma, user } from '@prisma/client';
import { body } from 'express-validator';
import { sucessResponse } from '../utils/response';
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
        method: Methods.GET,
        handler: this.Test,
        localMiddleware: [handleAuth],
      },
    ];
  }
  async Register(req: Request, res: Response) {
    const authService = new AuthService();
    const datas = await authService.register(req);
    sucessResponse(res, datas);
  }

  async Login(req: Request, res: Response) {
    const authService = new AuthService();
    const datas = await authService.login(req);
    res.json(sucessResponse(res, datas));
  }

  async Refresh(req: TypedRequestBody<any>, res: Response) {
    const authService = new AuthService();
    const datas = await authService.refresh(req);
    sucessResponse(res, datas);
  }

  async Test(req: TypedRequestBody<any>, res: Response) {
    sucessResponse(res, { sucess: true });
  }
}

export default AuthController;
