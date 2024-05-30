const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const Team = require("./Team")

const RidersTeams = sequelize.define('RidersTeams', {
    season: {
        type: DataTypes.STRING
    },
    since: {
        type: DataTypes.STRING,
    },
    until: {
        type: DataTypes.STRING,
    }
})

Rider.belongsToMany(Team, { through: RidersTeams });
Team.belongsToMany(Rider, { through: RidersTeams });

module.exports = RidersTeams;