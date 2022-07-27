import { UserModel } from '../../../models/user';
const userResolver = () => {
    return UserModel.findAll();
};
export default userResolver;
