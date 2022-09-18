import { PrismaClient, Prisma } from '@prisma/client';
import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import logger from 'node-color-log';
import AuthException from '../exceptions/AuthException';
import ExceptionError from '../exceptions/base';
import PrismaException from '../exceptions/PrismaException';

const injectRespondMethod = async (
  err: TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = err;

  if (err instanceof TypeError) {
    customError = new ExceptionError('type error', err);
    await res.send(customError);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    customError = new PrismaException('Prisma Excepetion', err);
    await res.send(customError);
  }
  await res.send(customError);

  next();
};
export default injectRespondMethod;
