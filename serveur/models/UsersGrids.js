const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsersGrids = sequelize.define('UsersGrids', {
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

UsersGrids.associate = (models) => {
  UsersGrids.hasMany(models.UsersGridsLines, { foreignKey: 'usersGridsId', as: 'lines' });
};

module.exports = UsersGrids;