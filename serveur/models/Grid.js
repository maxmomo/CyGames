const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Grid = sequelize.define('Grid', {
    level: {
        type: DataTypes.INTEGER,
    },
    i1: {
        type: DataTypes.INTEGER,
    },
    i2: {
        type: DataTypes.INTEGER,
    },
    i3: {
        type: DataTypes.INTEGER,
    },
    i4: {
        type: DataTypes.INTEGER,
    },
    i5: {
        type: DataTypes.INTEGER,
    },
    i6: {
        type: DataTypes.INTEGER,
    },
})


module.exports = Grid;