import Exception from './base';

export default class PrismaException extends Exception {
  constructor(message: string = '', error: any) {
    super(message, error);
    this.message = message;
    this.code = error.code;
  }
}
