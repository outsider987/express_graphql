import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import logger from 'node-color-log';
import path from 'path';

interface Json {
    status?: number;
    data?: any[];
  }
  interface MyResponseLocals {
    userId: string;
  }
  interface MyResponseBody {
    status: string;
    data:{}
  }
  
  type Send<T = Response> = (body?: Json) => T;
  
  interface CustomResponse extends Response {
    json: Send<this>;
  }
export const tryCatch =
  (handleRequest: RequestHandler, path: string) =>
  async (req: Request, res: Response<MyResponseBody, MyResponseLocals> , next: NextFunction) => {
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
      console.timeEnd('api Time');
      logger
        .bold()
        .bgColor('red')
        .error(`${__dirname} \n api path: ${JSON.stringify(path)} \n ${JSON.stringify(error)}`);

      await next(error);
    }
  };

export const toResponse = (data = {}) => ({
  status: 1,
  data,
});


