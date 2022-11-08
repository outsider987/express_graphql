import { PrismaClient, Prisma } from '@prisma/client';
import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import logger from 'node-color-log';
import AuthException from '../exceptions/AuthException';
import ExceptionError from '../exceptions/base';
import PrismaException from '../exceptions/PrismaException';
import { failedResponse } from '../utils/response';

const injectRespondMethod = async (
  err: TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;
try {
  if (err instanceof TypeError) {
    customError = new ExceptionError('type error', err);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    customError = new PrismaException('Prisma Excepetion', err);
  }
  await failedResponse(res, 404, customError);

  next();
  
} catch (error) {
  logger
  .bold()
  .bgColor('red')
  .error(
    `${error}}`
  );
  next();
}

};
export default injectRespondMethod;
