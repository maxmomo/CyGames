const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const GridInformation = sequelize.define('GridInformation', {
    element: {
        type: DataTypes.STRING,
    },
    information: {
        type: DataTypes.STRING,
    },
    additional: {
        type: DataTypes.STRING,
    },
})

module.exports = GridInformation;