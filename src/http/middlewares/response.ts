import { Response, Request, NextFunction, Router, RequestHandler } from 'express';
import logger from 'node-color-log';
import ExceptionError from '../exceptions/Exception';


 const injectRespondMethod = async ( err: TypeError | ExceptionError,req: Request, res: Response, next: NextFunction) => {
    let customError = err;
    if (!(err instanceof ExceptionError)) {
      customError =  new ExceptionError(0,"api error");
    }
    
  
    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    await res.send(customError);
  next();
};
export default injectRespondMethod