const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsersGrids = sequelize.define('UsersGrids', {
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = UsersGrids;