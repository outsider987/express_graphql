import Exception from './base';

export default class AuthException extends Exception {
  constructor(message: string = '', error?: any, code?: string) {
    super(error, message);
    this.message = message;

    if (code !== undefined) this.code = code;
  }
  static register = (error: any) => {
    return new AuthException('register error', error, 'E-0001');
  };
  static tokenNotExist = (error: any) => {
    return new AuthException('register error', error, 'E-0002');
  };
  static tokenNotAuthorized = (error: any) => {
    return new AuthException('token not authorized', error, 'E-0003');
  };
  static loginNoUser = (error: any) => {
    return new AuthException('login no User', error, 'E-0004');
  };
  static loginWrongPassword = (error: any) => {
    return new AuthException('wrong password', error, 'E-0005');
  };
  static createTokenFailed = (error: any) => {
    return new AuthException('create token failed', error, 'E-0006');
  };
}
