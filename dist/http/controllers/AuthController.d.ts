import { Request, Response } from 'express';
import Controller from './Controller';
declare class AuthController extends Controller {
    constructor();
    Register(req: Request, res: Response): Promise<void>;
}
export default AuthController;
