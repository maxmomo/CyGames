const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    nationality: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    abbreviation: {
        type: DataTypes.STRING,
    },
    bike: {
        type: DataTypes.STRING,
    },
    jersey: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.INTEGER,
    },
    related_team_id: {
        type: DataTypes.INTEGER,
    },
    facebook: {
        type: DataTypes.STRING,
    },
    twitter: {
        type: DataTypes.STRING,
    },
    instagram: {
        type: DataTypes.STRING,
    },
    site: {
        type: DataTypes.STRING,
    }
});

module.exports = Team;
