import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import logger from 'node-color-log';

export const tryCatch =
  (handleRequest: RequestHandler, path: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger
        .bold()
        .bgColor('green')
        .info(`start count ${JSON.stringify(path)} api time`);
        
      console.time('api Time');
      await handleRequest(req, res, next);
      console.timeEnd('api Time');
      logger.bold().bgColor('green').info('end count');
      next();
    } catch (error) {
      const data = { ...error, status: 0 };
      logger
        .bold()
        .bgColor('red')
        .error(`${JSON.stringify(path)} \n ${JSON.stringify(data)}`);
      res.send(data);
      await next(error);
    }
  };
