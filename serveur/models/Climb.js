const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Climb = sequelize.define('Climb', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
})

module.exports = Climb;