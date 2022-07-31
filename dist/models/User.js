"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static assoicate(models) {
        // User.belongsToMany(models.User,)
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll();
        });
    }
}
exports.default = User;
module.exports = (sequelize, dataTypes) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM,
            values: ['active', 'disabled'],
            defaultValue: 'active',
            allowNull: false,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        sequelize: sequelize,
        paranoid: true,
    });
    return User;
};
