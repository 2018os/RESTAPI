require("dotenv").config();

const baseDbSetting = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
};

module.exports = {
  production: Object.assign(
    {
      database: process.env.DB_NAME,
      logging: false
    },
    baseDbSetting
  ),

  development: Object.assign(
    {
      database: process.env.DB_DEV,
      logging: true
    },
    baseDbSetting
  ),

  test: Object.assign(
    {
      database: process.env.DB_TEST,
      logging: false
    },
    baseDbSetting
  )
};
