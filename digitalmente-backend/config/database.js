const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('digitalmente', 'postgres', '1606', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Define false para desativar os logs
});

module.exports = sequelize;
