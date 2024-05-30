const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Race = sequelize.define('Race', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    edition: {
        type: DataTypes.INTEGER,
    },
    nationality: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
    odr: {
        type: DataTypes.STRING,
    },
    start_date: {
        type: DataTypes.STRING
    },
    end_date: {
        type: DataTypes.STRING,
    },
    pcs_id: {
        type: DataTypes.INTEGER,
    },
    season: {
        type: DataTypes.STRING,
    }
});

module.exports = Race;