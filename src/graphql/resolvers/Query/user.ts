import db from '../../../models';
import  User  from '../../../models/user';

const userResolver = () => {
    // console.log(JSON.stringify(db) );
    // const t = new User();
    
    return db.User.findAll();
};
export default userResolver;
