"use strict";
// /* eslint-disable no-unused-vars */
// import { DataTypes, ModelCtor, Model, UUIDV4, Sequelize } from 'sequelize';
// export type UserAttribute ={
//     id: number;
//     status: string;
//     username: string;
//     email: string;
//     password: string;
// }
// export default class User extends Model<UserAttribute> implements UserAttribute {
//     public id!: number;
//     public status!: string;
//     public username!: string;
//     public email!: string;
//     public password!: string;
//     static assoicate(models: any) {
//         // User.belongsToMany(models.User,)
//     }
//     static async getUsers() {
//         return await this.findAll();
//     }
// }
// module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
//     User.init(
//         {
//             id: {
//                 type: DataTypes.UUID,
//                 primaryKey: true,
//                 defaultValue: UUIDV4,
//                 allowNull: false,
//             },
//             status: {
//                 type: DataTypes.ENUM,
//                 values: ['active', 'disabled'],
//                 defaultValue: 'active',
//                 allowNull: false,
//             },
//             username: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//                 unique: true,
//             },
//             email: {
//                 type: DataTypes.STRING,
//                 validate: {
//                     isEmail: true,
//                 },
//                 allowNull: false,
//             },
//             password: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//         },
//         {
//             timestamps: true,
//             sequelize: sequelize,
//             paranoid: true,
//         }
//     );
//     return User;
// };
// code above unchanged
model;
User;
{
    id;
    String;
    (uuid());
    createdAt;
    DateTime;
    (now());
    updatedAt;
    DateTime;
    email;
    String ?  : ;
    image;
    String ?
        role : ;
    Role;
    (USER);
}
var Role;
(function (Role) {
    Role[Role["USER"] = 0] = "USER";
    Role[Role["ADMIN"] = 1] = "ADMIN";
})(Role || (Role = {}));
