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
}
