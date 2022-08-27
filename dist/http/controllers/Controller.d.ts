import { Response, Request, NextFunction, Router } from 'express';
export declare enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
interface IRoute {
    path: string;
    method: Methods;
    handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
    localMiddleware?: ((req: Request, res: Response, next: NextFunction) => void)[];
}
export default abstract class Controller {
    router: Router;
    path: string;
    protected routes: Array<IRoute>;
    setRoutes: () => Router;
}
export {};
