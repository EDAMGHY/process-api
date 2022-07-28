const { Sequelize } = require('sequelize');

const { DATABASE, USERNAME, PASSWORD, HOST, DIALECT, DB_PORT } = process.env;

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: DB_PORT,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.cyan.underline);
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`.red.bold);
  }
};

module.exports = { connectDB, sequelize };
