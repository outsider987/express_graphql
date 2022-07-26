import { Prisma, PrismaClient } from '@prisma/client';
import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import { body, check, ValidationChain, validationResult } from 'express-validator';
import { tryCatch } from '~/http/utils/response';
import ValidatorException from '../exceptions/ValidatorException';
import { TypedRequestBody } from '../utils/request';

// HTTP methods
export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

// Route interface for each route in `routes` field of `Controller` class.
interface IRoute {
    path: string;
    method: Methods;
    handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
    localMiddleware?: ((req: TypedRequestBody, res: Response, next: NextFunction) => void | Promise<void>)[];
    validation?: ValidationChain[];
    pararms?: Record<any, any>;
}

export default abstract class Controller {
    // Router instance for mapping routes
    public router: Router = Router();
    // The path on which this.routes will be mapped
    public path!: string;
    // Array of objects which implement IRoutes interface
    protected routes: Array<IRoute> = [];
    public prisma = new PrismaClient();

    public setRoutes = (): Router => {
        // Set HTTP method, middleware, and handler for each route
        // Returns Router object, which we will use in Server class

        for (const route of this.routes) {
            if (route.localMiddleware)
                for (const mw of route.localMiddleware) {
                    this.router.use(route.path, mw);
                }
            const validateList = route.validation ? route.validation : [];

            switch (route.method) {
                case 'GET':
                    this.router.get(route.path, validateList, tryCatch(route.handler, this.path + route.path));
                    break;
                case 'POST':
                    this.router.post(route.path, validateList, tryCatch(route.handler, this.path + route.path));
                    break;
                case 'PUT':
                    this.router.put(route.path, validateList, tryCatch(route.handler, this.path + route.path));
                    break;
                case 'DELETE':
                    this.router.delete(route.path, validateList, tryCatch(route.handler, route.path));
                    break;
                default:
                // Throw exception
            }
        }
        // Return router instance (will be usable in Server class)
        return this.router;
    };
}
