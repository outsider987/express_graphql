require('dotenv').config();

const dbConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    encrypt: true,
  },
};

module.exports = {
  development: dbConfig,
  staging: dbConfig,
  production: dbConfig,
};
