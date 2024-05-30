const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const Race = require("./Race")
const Stage = require("./Stage")

const Odd = sequelize.define('Odd', {
    value: {
        type: DataTypes.FLOAT,
    },
})

Rider.hasMany(Odd);
Odd.belongsTo(Rider);

Stage.hasMany(Odd, {
    onDelete: 'CASCADE', // Lorsqu'un utilisateur est supprimé, les posts associés auront la clé étrangère définie à null
});
Odd.belongsTo(Stage, {
    onDelete: 'CASCADE', // Lorsqu'un utilisateur est supprimé, les commentaires associés auront la clé étrangère définie à null
});

Race.hasMany(Odd);
Odd.belongsTo(Race);

module.exports = Odd;