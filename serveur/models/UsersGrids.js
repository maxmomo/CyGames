const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsersGrids = sequelize.define('UsersGrids', {
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  awarded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
});

module.exports = UsersGrids;