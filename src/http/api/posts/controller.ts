import { IRoute, Request, Response } from 'express';
import PostsService from './service';
import Controller, { Methods } from '../../common/baseController';
import { localLog } from '~/http/utils/logger';
import { sucessResponse } from '~/http/utils/response';

class PostsController extends Controller {
    constructor() {
        super();
        this.path = '/user';
        this.routes = [
            {
                path: '/',
                method: Methods.GET,
                handler: this.getPosts,
            },
        ];
    }
    async getPosts(req: Request, res: Response) {
        const userService = new PostsService();
        const dates = await userService.getPosts(req);
        localLog(dates);
        sucessResponse(res, dates);
    }
}

export default PostsController;
