import { Request, Response } from 'express';
import { title } from 'process';
import BaseService from '~/http/common/baseService';

class PostsService extends BaseService {
    async getPosts(searchText: string) {
        return this.prisma.marvel.findMany({
            where: {
                OR: [
                    { comic_name: { contains: searchText } },
                    { issue_title: { contains: searchText } },
                    { active_years: searchText },
                    { publish_date: searchText },
                    { penciler: { contains: searchText } },
                    { writer: { contains: searchText } },
                    { cover_artist: { contains: searchText } },
                    { Format: { contains: searchText } },
                    { Rating: { contains: searchText } },
                    // {Price:{}}
                ],
            },
        });
    }
}
export default PostsService;
