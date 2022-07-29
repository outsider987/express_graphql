
import { DataTypes, ModelCtor, Model, UUIDV4, Sequelize, CreationOptional } from 'sequelize';

export interface TokenAttribute {
    id: number;
    token_enabledId: string;
    token_type: string;
    status: string;
    expiresAt:CreationOptional<Date>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

export class Token extends Model<TokenAttribute> implements TokenAttribute {
    id!: number;
    token_enabledId!: string;
    token_type!: string;
    status!: string;
    expiresAt!:CreationOptional<Date>;
    createdAt!: CreationOptional<Date>;
    updatedAt!: CreationOptional<Date>;
    static assoicate(models: any) {
        // User.belongsToMany(models.User,)
    }
    static async users() {
        return await this.findAll();
    }
}

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    Token.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            token_enabledId: {
                type: DataTypes.STRING,
            },
            token_type: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING,
            },
            expiresAt:{
                allowNull: false,
                type: DataTypes.DATE,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            timestamps: true,
            sequelize: sequelize,
            paranoid: true,
        }
    );
    return Token;
};
