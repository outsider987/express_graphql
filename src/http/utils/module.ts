import AuthController from '~/http/api/auth/controller';
import Controller from '../common/baseController';
import UserController from '~/http/api/user/controller';

export const controllers: Array<Controller> = [new AuthController(), new UserController()];
