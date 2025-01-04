const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsersCrossWords = sequelize.define('UsersCrossWords', {
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

module.exports = UsersCrossWords;