import AuthController from './AuthController';
import Controller from './base';
import UserController from './UserController';

const controllers: Array<Controller> = [new AuthController(), new UserController()];
export default controllers;
