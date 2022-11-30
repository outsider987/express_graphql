import { Request } from 'express';
export interface TypedRequestBody extends Request {
    auth: { email: ''; user_id: '' };
}
