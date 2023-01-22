import { TypedRequestBody } from '../../utils/request';
import { IRoute, Request, Response } from 'express';
import AuthService from './service';
import Controller, { Methods } from '../../common/baseController';
import { prisma, Prisma, user } from '@prisma/client';
import { body } from 'express-validator';
import { sucessResponse } from '../../utils/response';
import { handleAuth } from '../../middlewares/local/authHandler';
import passport from '~/http/utils/passport';

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
            {
                path: '/google',
                method: Methods.GET,
                handler: passport.authenticate('google', { scope: ['profile'] }),
            },
            {
                path: '/google/callback',
                method: Methods.GET,
                handler: this.googleCallBack,
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

    async Refresh(req: TypedRequestBody, res: Response) {
        const authService = new AuthService();
        const datas = await authService.refresh(req);
        sucessResponse(res, datas);
    }

    async Test(req: TypedRequestBody, res: Response) {
        sucessResponse(res, { sucess: true });
    }

    async googleCallBack(req: TypedRequestBody, res: Response) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
}

export default AuthController;
