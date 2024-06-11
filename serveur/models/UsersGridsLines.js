const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsersGridsLines = sequelize.define('UsersGridsLines', {
    index: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    usersGridsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    riderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false, // Ajout de cette option
    },
});

UsersGridsLines.associate = (models) => {
    UsersGridsLines.belongsTo(models.UsersGrids, {
        through: models.UsersGridsLines,
        foreignKey: 'usersGridsId',
    });
    UsersGridsLines.belongsTo(models.Rider, {
        through: models.UsersGridsLines,
        foreignKey: 'riderId',
    });
};

module.exports = UsersGridsLines;
