const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const User = require('./User')

const UserRiders = sequelize.define('UserRiders', 
    {
    }, 
);

module.exports = UserRiders;