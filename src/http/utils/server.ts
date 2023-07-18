import { PrismaClient } from '@prisma/client';
import { Application, RequestHandler, ErrorRequestHandler } from 'express';
import Controller from '~/http/common/baseController';
import http from 'http';

class Server {
    private app: Application;
    private readonly port: number;
    public prisma: PrismaClient;

    constructor(app: Application, port: number) {
        this.app = app;
        this.port = port;

        this.app.enable('trust proxy');
        this.app.set('trust proxy', 1);

        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.set('credentials', 'include');

            res.set('Access-Control-Allow-Origin', req.headers.origin);
            res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            next();
        });
    }

    public run(): http.Server {
        return this.app.listen(this.port, () => {
            console.log(`Up and running on port http://localhost:${this.port}`);
        });
    }

    public loadMiddleware(middleware: Array<RequestHandler>): void {
        // global stuff like cors, body-parser, etc
        middleware.forEach((mw) => {
            this.app.use(mw);
        });
    }

    public loadErrorMiddleware(middleware: Array<ErrorRequestHandler>): void {
        // global stuff like cors, body-parser, etc
        middleware.forEach((mw) => {
            this.app.use(mw);
        });
    }

    public loadControllers(controllers: Array<Controller>): void {
        controllers.forEach((controller) => {
            // use setRoutes method that maps routes and returns Router object
            this.app.use(controller.path, controller.setRoutes());
        });
    }

    public async initDatabase(): Promise<void> {
        // ...
    }
}
export default Server;
