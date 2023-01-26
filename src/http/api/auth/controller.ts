import { TypedRequestBody } from '../../utils/request';
import { IRoute, Request, Response } from 'express';
import AuthService from './service';
import Controller, { Methods } from '../../common/baseController';
import { prisma, Prisma, PrismaClient, user } from '@prisma/client';
import { body } from 'express-validator';
import { failedResponse, sucessResponse } from '../../utils/response';
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
                handler: passport.authenticate('google', { scope: ['openid', 'email', 'profile'] }),
            },
            {
                path: '/google/callback',
                method: Methods.GET,
                localMiddleware: [
                    passport.authenticate('google', {
                        // successRedirect: 'http://127.0.0.1:8080/#/member/login',
                        failureRedirect: '/login',
                        session: true,
                    }),
                ],
                handler: this.googleCallBack,
            },
            {
                path: '/login/success',
                method: Methods.GET,
                handler: this.loginSucess,
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

    async loginSucess(req: TypedRequestBody, res: Response) {
        const user = req.user as any;

        if (user) {
            const authService = new AuthService();
            const googleUser = await authService.getGoogleUserByGoogleId(user.id, 'google');
            const tokens = await authService.createTokens({
                username: user.displayName,
                email: user.emails[0].value,
                user_id: googleUser.id,
            });
            sucessResponse(res, tokens);
        } else throw 'login failed';
    }

    async googleCallBack(req: TypedRequestBody, res: Response) {
        // Successful authentication, redirect home.
        const code = req.query.code as string;
        const user = req.user;
        const pathUrl = (req.query.state as string) || '/';
        const prisma = new PrismaClient();

        const authService = new AuthService();
        const res2 = await authService.saveGoogleUser(req.user);
        if (!code) {
            failedResponse(res, 'Authorization code not provided!', 401);
        }

        res.redirect('http://127.0.0.1:8080/#/member/login');
        // sucessResponse(res, { sucess: true });
    }
}

export default AuthController;
