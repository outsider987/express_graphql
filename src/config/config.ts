require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const dbConfig = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
};

export default {
  port: parseInt(process.env.DB_PORT as string, 10) || 3000,

  ...dbConfig,

  jwtSecret: process.env.JWT_SECRET || 'mcc',

  logs: {
    level:
      process.env.LOG_LEVEL || (process.env.NODE_ENV === 'test' ? 'warning' : 'silly'),
  },

  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
  smsSID: process.env.TWILIO_ACCOUNT_SID,
  smsToken: process.env.TWILIO_AUTH_TOKEN,
  smsMobile: process.env.TWILIO_MOBILE_NUMBER,
};
