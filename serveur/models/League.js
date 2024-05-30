const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const League = sequelize.define('League', {
    name: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    nb_users: {
        type: DataTypes.INTEGER,
    },
    mercato_endDate1: {
        type: DataTypes.DATE,
        defaultValue: "2024-01-15"
    },
    mercato_endDate2: {
        type: DataTypes.DATE,
        defaultValue: "2024-01-30"
    },
    mercato_turns: {
        type: DataTypes.INTEGER,
        defaultValue: 2
    },
    avatar: {
        type: DataTypes.TEXT('long'),
    } 
});

module.exports = League;