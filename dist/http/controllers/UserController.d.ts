import { Request, Response } from 'express';
import Controller from './Controller';
declare class UserController extends Controller {
    constructor();
    getUser(req: Request, res: Response): Promise<void>;
}
export default UserController;
