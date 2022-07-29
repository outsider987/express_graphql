import { Token } from '../../../models/token';
const tokenResolver = () => {
    return Token.findAll();
};
export default tokenResolver;
