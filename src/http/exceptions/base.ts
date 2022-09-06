
export default class Exception extends Error {
    public status: number = 0;
    public message: string = ''
    public code: string = 'E-0000'
    public error: {} 
    constructor( message: string = '',error:{}) {
      super()
      this.message = message;
      this.error = error;
    }

}
