const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsersGridsLines = sequelize.define('UsersGridsLines', {
    index: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    correct: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

UsersGridsLines.associate = (models) => {
    UsersGridsLines.belongsTo(models.User, {
        through: models.UsersGridsLines,
        foreignKey: 'userId',
    });
    UsersGridsLines.belongsTo(models.Rider, {
        through: models.UsersGridsLines,
        foreignKey: 'riderId',
    });
    UsersGridsLines.belongsTo(models.Grid, {
        through: models.UsersGridsLines,
        foreignKey: 'gridId',
    });
};

module.exports = UsersGridsLines;
