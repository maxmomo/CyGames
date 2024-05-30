const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const User = require('./User')

const UserRiders = sequelize.define('UserRiders', 
    {
        LeagueId: {
            type: DataTypes.INTEGER
        }
    }, 
);

Rider.belongsToMany(User, { through: UserRiders });
User.belongsToMany(Rider, { through: UserRiders });

module.exports = UserRiders;