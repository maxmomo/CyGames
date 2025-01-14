const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Exchange = sequelize.define('Exchange', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    info: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rank_condition: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    category_condition: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    country_condition: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    team_condition: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    award_cat: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    award_rider_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    award_team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    award_rank: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    award_country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    award_new: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    award_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
})

module.exports = Exchange;