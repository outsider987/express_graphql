import {
  Response,
  Request,
  NextFunction,
  Router,
  RequestHandler,
} from 'express';
export const tryCatch =
  (handleRequest: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      handleRequest(req, res, next);
      next();
    } catch (error) {
      next(error);
    }
  };

  