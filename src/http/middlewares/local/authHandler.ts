import { PrismaClient } from '@prisma/client';
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { failedResponse } from '~/http/utils/response';
import AuthException from '../../exceptions/AuthException';
import { TypedRequestBody } from '../../utils/request';

export const handleAuth = async (req: TypedRequestBody, res: Response, next: NextFunction) => {
    try {
        const token = req.header('authorization')?.replace('Bearer ', '');

        if (!token) {
            throw AuthException.tokenNotExist(token);
        }

        const auth = jwt.verify(token, process.env.JWT_SECRECT as string);

        if (!auth) {
            // res.status(401);
            throw AuthException.tokenNotAuthorized(auth);
        } else {
            auth['token'] = token;
            req.auth = auth as any;
            next();
        }
    } catch (error) {
        failedResponse(res, error, 401);
    }
};
