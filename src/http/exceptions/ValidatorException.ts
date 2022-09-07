import Exception from './base';

export default class ValidatorException extends Exception {
  constructor(message: string = '', errors?: any, code?: string) {
    super(errors, message);
    this.message = message;

    if (code !== undefined) this.code = code;
    this.errors = errors;
  }
  static bodyCheck = (errors: any) => {
    return new ValidatorException('validate error', errors, 'E-0001');
  };
}
