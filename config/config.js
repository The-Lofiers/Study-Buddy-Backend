require("dotenv").config({ path: "../.env" });
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  test: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
  production: {
    username: process.env.PRO_DB_USER,
    password: process.env.PRO_PASSWORD,
    database: process.env.PRO_DATABASE,
    host: process.env.PRO_HOST,
    dialect: process.env.PRO_DIALECT,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
  },
};
