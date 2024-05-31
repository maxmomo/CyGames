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
  } 
});

User.associate = (models) => {
  User.belongsToMany(models.Grid, {
    through: models.UsersGrids,
    foreignKey: 'userId',
  });
};

module.exports = User;
