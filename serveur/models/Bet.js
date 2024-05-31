const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider")
const Race = require("./Race")
const Stage = require("./Stage")
const User = require("./User")
const BetType = require("./BetType")
const League = require("./League")
const UsersLeagues = require("./UsersLeagues")
const Grid = require("./Grid")
const GridInformation = require("./GridInformation")
const UsersGrids = require("./UsersGrids")

const Bet = sequelize.define('Bet', 
    {
        position: {
            type: DataTypes.INTEGER,
        },
        point: {
            type: DataTypes.INTEGER,
        },
        computed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, 
    {
        hooks: {
            afterCreate: async (bet, options) => {
                console.log("After create triggered");
                update_points(bet);
            },
            afterUpdate: async (bet, options) => {
                console.log("After update triggered");
                update_points(bet);
            },
            afterDestroy: async (bet, options) => {
                console.log("Before destroy triggered");
                update_points(bet);
            }
        }
    }
)

Rider.hasMany(Bet);
Bet.belongsTo(Rider);

Race.hasMany(Bet);
Bet.belongsTo(Race);

Stage.hasMany(Bet);
Bet.belongsTo(Stage);

User.hasMany(Bet);
Bet.belongsTo(User);

BetType.hasMany(Bet);
Bet.belongsTo(BetType);

League.hasMany(Bet);
Bet.belongsTo(League);

const update_points = async (bet) => {
    const totalPoints = await Bet.sum('point', {
        where: {
            LeagueId: bet.LeagueId,
            UserId: bet.UserId,
        }
    });    

    await UsersLeagues.update({ 
        points: totalPoints 
    }, {
        where: {
            LeagueId: bet.LeagueId,
            UserId: bet.UserId,
        }
    });
}

module.exports = Bet;