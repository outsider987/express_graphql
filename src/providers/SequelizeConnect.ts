
import { Sequelize } from 'sequelize';
import dbConfig from '../config/config'
// import Model from '../models';


const SequelizeConnect = () => {
//   const config = container.get(TYPES.Config);
//   const logger = container.get(TYPES.Logger);
const  sequelize= new Sequelize(dbConfig.dbName as string, dbConfig.dbUser as string, dbConfig.dbPassword, {
    port: Number(dbConfig.dbPort) || 5432,
    host: dbConfig.dbHost || 'localhost',
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
  sequelize
  return sequelize
};

export default SequelizeConnect;
