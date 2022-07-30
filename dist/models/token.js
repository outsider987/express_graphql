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
exports.Token = void 0;
const sequelize_1 = require("sequelize");
class Token extends sequelize_1.Model {
    static assoicate(models) {
        // User.belongsToMany(models.User,)
    }
    static users() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll();
        });
    }
}
exports.Token = Token;
module.exports = (sequelize, dataTypes) => {
    Token.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        token_enabledId: {
            type: sequelize_1.DataTypes.STRING,
        },
        token_type: {
            type: sequelize_1.DataTypes.STRING,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
        },
        expiresAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
    }, {
        timestamps: true,
        sequelize: sequelize,
        paranoid: true,
    });
    return Token;
};
