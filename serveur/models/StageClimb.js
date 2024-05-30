const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Climb = require("./Climb")
const Stage = require('./Stage')

const StageClimb = sequelize.define('StageClimb', 
    {
    }, 
);

Climb.belongsToMany(Stage, { through: StageClimb });
Stage.belongsToMany(Climb, { through: StageClimb });

module.exports = StageClimb;