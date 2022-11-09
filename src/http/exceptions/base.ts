export default class Exception extends Error {
    public status: boolean = false;
    public message: string = '';
    public code: string = 'E-0000';
    public errors: {};
    constructor(message: string = '', error: {}) {
        super();
        this.message = message;
        this.errors = error;
    }
}
