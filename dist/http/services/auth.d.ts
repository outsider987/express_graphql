import { Request } from "express";
declare class AuthService {
    constructor();
    register(res: Request): Promise<void>;
}
export default AuthService;
