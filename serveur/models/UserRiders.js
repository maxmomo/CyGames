const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const UserRiders = sequelize.define('UserRiders', 
    {
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
    }, 
);

module.exports = UserRiders;