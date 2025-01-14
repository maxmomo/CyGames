const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.TEXT('long'),
  },
  credit: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
});

User.associate = (models) => {
  User.belongsToMany(models.Grid, {
    through: models.UsersGrids,
    foreignKey: 'userId',
  });
  User.hasMany(models.UsersGridsLines, { 
    foreignKey: 'userId', 
    as: 'users' 
  });
  User.belongsToMany(models.Rider, {
    through: models.UserRiders,
    foreignKey: 'userId',
  });
  User.belongsToMany(models.CrossWord, {
    through: models.UsersCrossWords,
    foreignKey: 'userId',
  });
};

module.exports = User;