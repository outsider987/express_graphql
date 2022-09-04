import { PrismaClient } from '@prisma/client';
import { Application, RequestHandler ,ErrorRequestHandler} from 'express';
import Controller from '~/http/controllers/Controller';
import http from 'http';

class Server {
  private app: Application;
  private readonly port: number;

  constructor(app: Application, database: PrismaClient, port: number) {
    this.app = app;
    this.port = port;
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
