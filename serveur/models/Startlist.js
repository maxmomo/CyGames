const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const Race = require("./Race")

const StartList = sequelize.define('StartList', {
})

Rider.belongsToMany(Race, { through: StartList });
Race.belongsToMany(Rider, { through: StartList });

module.exports = StartList;