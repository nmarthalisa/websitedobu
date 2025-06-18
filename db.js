const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  database: 'dobu_martial_arts',
  username: 'your_username',
  password: 'your_password',
});

module.exports = { sequelize };