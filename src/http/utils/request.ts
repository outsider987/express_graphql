import { Request } from 'express';
export interface TypedRequestBody<T> extends Request {
  auth: T;
}
