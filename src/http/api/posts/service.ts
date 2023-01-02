import { Request, Response } from 'express';
import { title } from 'process';
import BaseService from '~/http/common/baseService';

class PostsService extends BaseService {
    async getPosts(searchText: string) {
        return this.prisma.post.findMany({
            where: { title: { contains: searchText }, author: { OR: { name: { contains: searchText } } } },
        });
    }
}
export default PostsService;
