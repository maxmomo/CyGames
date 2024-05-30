const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const BetType = sequelize.define('BetType', {
    name: {
        type: DataTypes.STRING,
    },
})

module.exports = BetType;