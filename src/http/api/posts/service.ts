import { Request, Response } from 'express';
import { title } from 'process';
import BaseService from '~/http/common/baseService';

class PostsService extends BaseService {
    async getPosts(searchText: string) {
        return this.prisma.post.findMany({
            where: {
                OR: [{ title: { contains: searchText } }, { body: { contains: searchText } }],
            },
        });
    }
}
export default PostsService;
