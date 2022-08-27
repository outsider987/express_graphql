import { IRoute, Request, Response } from 'express';
import UserService from '../services/user';
import Controller, { Methods } from './Controller';

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
    console.log(dates);
    await res.send(dates);
  }
}

export default UserController;
