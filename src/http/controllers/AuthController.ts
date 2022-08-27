import { IRoute, Request, Response } from 'express';
import AuthService from '../services/auth';
import Controller, { Methods } from './Controller';

class AuthController extends Controller {
    constructor() {
        super();
        this.path = '/auth';
        this.routes=[
            {path:'/register',method:Methods.POST,
        handler:this.Register}
        ];
    }
    async Register(req: Request, res: Response) {
        const authService = new AuthService();
        const dates = await authService.register(req);
        await res.send(dates);
    }
}

export default AuthController;
