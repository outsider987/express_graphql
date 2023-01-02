import AuthController from '~/http/api/auth/controller';
import Controller from '../common/baseController';
import UserController from '~/http/api/user/controller';
import PostsController from '../api/posts/controller';

export const controllers: Array<Controller> = [new AuthController(), new UserController(), new PostsController()];
