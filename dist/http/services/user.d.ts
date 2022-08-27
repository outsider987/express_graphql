import { Request } from "express";
declare class UserService {
    constructor();
    users(res: Request): Promise<import(".prisma/client").users[]>;
}
export default UserService;
