import { IRoute, Request, Response } from 'express';
import PostsService from './service';
import Controller, { Methods } from '../../common/baseController';
import { localLog } from '~/http/utils/logger';
import { sucessResponse } from '~/http/utils/response';
import logger from 'node-color-log';

class PostsController extends Controller {
    constructor() {
        super();
        this.path = '/post';
        this.routes = [
            {
                path: '',
                method: Methods.GET,
                handler: this.getPosts,
            },
        ];
    }
    async getPosts(req: Request<never, never, never, { searchText: '' }>, res: Response) {
        const { searchText } = req.query;
        const userService = new PostsService();

        const dates = await userService.getPosts(searchText);
        console.log(dates);
        sucessResponse(res, dates);
    }
}

export default PostsController;
