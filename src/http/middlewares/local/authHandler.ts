import { PrismaClient } from '@prisma/client';
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import AuthException from '../../exceptions/AuthException';
import { TypedRequestBody } from '../../utils/request';

const prisma = new PrismaClient();

export const handleAuth = async (
  req: TypedRequestBody<any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('authorization')?.replace('Bearer ', '');

    if (!token) {
      throw AuthException.tokenNotExist(token);
    }
    const tokenDatas = await prisma.refresh_token.findFirst({
      where: { refresh_token_id: token },
    });
    if (!tokenDatas) {
      throw AuthException.tokenNotExist(token);
    }

    const auth = jwt.verify(token, process.env.JWT_SECRECT as string);

    if (!auth) {
      throw AuthException.tokenNotAuthorized(auth);
    } else {
      req.auth = auth;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
