import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import logger from 'node-color-log';
import ExceptionError from '../exceptions/Exception';
export const tryCatch =
  (handleRequest: RequestHandler, path: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      logger
        .bold()
        .bgColor('green')
        .info(`start count ${JSON.stringify(path)} api time`);
      console.time('api Time');
      res.set({status:1})
      await handleRequest(req, res, next);

      console.timeEnd('api Time');
      logger.bold().bgColor('green').info('end count');


      next();
    } catch (error) {
      console.timeEnd('api Time');
      const data = { ...error, status: 0 };
      logger
        .bold()
        .bgColor('red')
        .error(`${JSON.stringify(path)} \n ${JSON.stringify(data)}`);

      await next(error);
    }
  };

export const toResponse = (data = {}) => ({
  status: 1,
  data,
});

//   export const fromError = (error, errorCode) => {
//     const code = !errorCode && isException(error) ? error.status : errorCode;
//     const errorMessage = error instanceof Error ? error.message : error;
//     return {
//       status: 0,
//       message: errorMessage,
//       code: code || toErrorCode(errorMessage),
//     };
//   };
//   export const fromPayload = R.pipe(snakecaseKeys, toResponse);

//   interface fromExceptionInter{
//     status: number,
//     message: string,
//     code: string,
//   }
//   export const fromException = (exception:fromExceptionInter) => {
//     return {
//       status: 0,
//       message: exception.message,
//       code: exception.status,
//     };
//   };
