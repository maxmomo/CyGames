const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Stage = sequelize.define('Stage', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING,
    },
    distance: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },
    vertical_meter: {
        type: DataTypes.INTEGER,
    },
    departure: {
        type: DataTypes.STRING
    },
    arrival: {
        type: DataTypes.STRING,
    },
    won_how: {
        type: DataTypes.STRING,
    },
    startlist_score: {
        type: DataTypes.INTEGER,
    },
    profile_score: {
        type: DataTypes.INTEGER,
    },
    race_id: {
        type: DataTypes.INTEGER,
    },
    profile_icone: {
        type: DataTypes.STRING,
    },
    profile: {
        type: DataTypes.STRING
    }
});

module.exports = Stage;