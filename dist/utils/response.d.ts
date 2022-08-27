import { Response, Request, NextFunction, RequestHandler } from 'express';
export declare const tryCatch: (handleRequest: RequestHandler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
