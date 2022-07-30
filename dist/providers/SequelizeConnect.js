"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
// import Model from '../models';
const SequelizeConnect = () => {
    //   const config = container.get(TYPES.Config);
    //   const logger = container.get(TYPES.Logger);
    const sequelize = new sequelize_1.Sequelize(config_1.default.dbName, config_1.default.dbUser, config_1.default.dbPassword, {
        port: Number(config_1.default.dbPort) || 5432,
        host: config_1.default.dbHost || 'localhost',
        dialect: 'mysql',
        // logging: logger.debug.bind(logger),
        // ssl: !!config.sslmode,
        // pool: {
        //   max: 5,
        //   min: 0,
        //   acquire: 30000,
        //   idle: 10000,
        // },
        dialectOptions: {
            //   ssl: config.sslmode ? {
            //     require: true,
            //   } : undefined,
            options: {
                requestTimeout: 5000
            }
        },
    });
    sequelize;
    return sequelize;
};
exports.default = SequelizeConnect;
