import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import logger from 'node-color-log';

export const tryCatch =
  (handleRequest: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.bold().bgColor('green').info('start count api time')
        console.time('api Time')
        await handleRequest(req, res, next);
        console.timeEnd('api Time')
        logger.bold().bgColor('green').info('end count')
      next();
    } catch (error) {
        logger.bold().bgColor('red').error(error)
        res.send({...error,status:0});
        await next(error);
    }
  };
