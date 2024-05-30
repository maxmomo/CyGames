const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rider = sequelize.define('Rider', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    nationality: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    since: {
        type: DataTypes.INTEGER,
    },
    team_id: {
        type: DataTypes.INTEGER
    },
    picture: {
        type: DataTypes.STRING,
    },
    stage_victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    gc_victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    points_victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    mountain_victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    young_victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    odr_victories: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    height: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    weight: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    place_of_birth: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    odr_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    gc_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tt_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sprint_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    climb_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    season_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    birthdate: {
        type: DataTypes.DATEONLY
    }
});

module.exports = Rider;