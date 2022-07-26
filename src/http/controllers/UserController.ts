import { IRoute, Request, Response } from 'express';
import UserService from '../services/user';
import { localLog } from '../utils/logger';
import { sucessResponse } from '../utils/response';
import Controller, { Methods } from './base';

class UserController extends Controller {
    constructor() {
        super();
        this.path = '/user';
        this.routes = [
            {
                path: '/',
                method: Methods.GET,
                handler: this.getUser,
            },
        ];
    }
    async getUser(req: Request, res: Response) {
        const userService = new UserService();
        const dates = await userService.users(req);
        localLog(dates);
        sucessResponse(res, dates);
    }
}

export default UserController;
