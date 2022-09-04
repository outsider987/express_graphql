


export default class Exception extends Error {

    public status: number = 0;
    public details: string = ''
    constructor(status: number = 0, details: string = '') {
      super()
      console.log();
      this.status = status
      this.details = details
    }

}
