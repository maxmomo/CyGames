const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const Stage = require("./Stage")
const Race = require("./Race")
const BetType = require("./BetType")

const Result = sequelize.define('Result', {
    points: {
        type: DataTypes.INTEGER,
    },
    result_rank: {
        type: DataTypes.INTEGER,
    },
})

Rider.hasMany(Result);
Result.belongsTo(Rider);

Stage.hasMany(Result);
Result.belongsTo(Stage);

Race.hasMany(Result);
Result.belongsTo(Race);

BetType.hasMany(Result);
Result.belongsTo(BetType);

module.exports = Result;