import { Request, Response } from 'express';
import BaseService from '~/http/common/baseService';

class PostsService extends BaseService {
    async getPosts(res: Request) {
        return this.prisma.post.findMany();
    }
}
export default PostsService;
