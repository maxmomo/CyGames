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
    birthdate: {
        type: DataTypes.DATEONLY
    },
    category: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    speciality: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    rank: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    special: {
        type: DataTypes.STRING
    },
    special_description: {
        type: DataTypes.STRING
    },
});

Rider.associate = (models) => {
    Rider.hasMany(models.UsersGridsLines, { 
        foreignKey: 'riderId', 
        as: 'riders' 
    });
    Rider.belongsToMany(models.User, {
        through: models.UserRiders,
        foreignKey: 'riderId',
    });
};

module.exports = Rider;