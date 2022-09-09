import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import logger from 'node-color-log';
import path from 'path';
import ValidatorException from '../exceptions/ValidatorException';

interface Json {
  status?: number;
  data?: any[];
}
interface MyResponseLocals {
  userId: string;
}
interface MyResponseBody {
  status: string;
  data: {};
}

type Send<T = Response> = (body?: Json) => T;

interface CustomResponse extends Response {
  json: Send<this>;
}

export const tryCatch =
  (handleRequest: RequestHandler, path: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) throw ValidatorException.bodyCheck(errors);

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
        .error(
          `${__dirname} \n api path: ${JSON.stringify(path)} \n ${JSON.stringify(error)}`
        );

      await next(error);
    }
  };

export const toResponse = (data = {}) => ({
  status: true,
  message: 'sucess',
  data,
});
