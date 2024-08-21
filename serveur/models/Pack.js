const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Pack = sequelize.define('Pack', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Pack;