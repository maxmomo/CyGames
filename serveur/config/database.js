const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pronovelo', 'root', 'Tomboonen0!', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
