import { TypedRequestBody } from '../../utils/request';
import { IRoute, Request, Response } from 'express';
import AuthService from './service';
import Controller, { Methods } from '../../common/baseController';
import { Prisma, PrismaClient, user } from '@prisma/client';
import { body } from 'express-validator';
import { failedResponse, sucessResponse } from '../../utils/response';
import { handleAuth } from '../../middlewares/local/authHandler';
import passport from '~/http/utils/passport';
import jwt from 'jsonwebtoken';
require('dotenv').config();

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
                        failureRedirect: '/login',
                    }),
                ],
                handler: this.GoogleCallBack,
            },
            {
                path: '/login/success',
                method: Methods.GET,
                handler: this.LoginSucess,
            },
            {
                path: '/logout',
                method: Methods.GET,
                handler: this.LogOut,
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
        sucessResponse(res, datas);
    }

    async LogOut(req: TypedRequestBody, res: Response, next: any) {
        await req.logOut({ keepSessionInfo: false }, (err) => {
            console.log(err);
        });

        return sucessResponse(res, 'log out');
    }

    async Refresh(req: TypedRequestBody, res: Response) {
        const authService = new AuthService();
        const datas = await authService.refresh(req);
        sucessResponse(res, datas);
    }

    async Test(req: TypedRequestBody, res: Response) {
        sucessResponse(res, { sucess: true });
    }

    async LoginSucess(req: TypedRequestBody, res: Response) {
        const cookieValue = await req.cookies.name;
        console.log(cookieValue);
        console.log(req.cookies);
        console.log(req.isAuthenticated());

        const user = req.user as any;

        // console.log(user);
        if (user) {
            const authService = new AuthService();
            const googleUser = await authService.getGoogleUserByGoogleId(user.id, 'google');
            const tokens = await authService.createTokens({
                username: user.displayName,
                email: user.emails[0].value,
                user_id: googleUser.id,
            });
            sucessResponse(res, tokens);
        } else failedResponse(res, 'no provider user', 401);
    }

    async GoogleCallBack(req: TypedRequestBody, res: Response) {
        // Successful authentication, redirect home.
        const code = req.query.code as string;
        const user = req.user;
        const pathUrl = (req.query.state as string) || '/';
        const authService = new AuthService();
        const res2 = await authService.saveGoogleUser(req.user);
        if (!code) {
            return failedResponse(res, 'Authorization code not provided!', 401);
        }
        return res.redirect(`${process.env.FRONTEND_URL}/#/member/login`);
        // sucessResponse(res, { sucess: true });
    }
}

export default AuthController;
