const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const User = require("./User")
const League = require("./League")
const { Op } = require("sequelize");

const UsersLeagues = sequelize.define('UsersLeagues', {
    total: {
        type: DataTypes.INTEGER,
        defaultValue: 200
    },
    points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ranking: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
})

const update_total = async (userLeague) => {
    const totalUsers = await UsersLeagues.count({
        where: {
            LeagueId: userLeague.LeagueId
        }
    });

    const userRanking = await UsersLeagues.count({
        where: {
            LeagueId: userLeague.LeagueId,
            points: { [Op.gt]: userLeague.points } // Count users with more points than the current user
        }
    });

    await League.update({ 
        nb_users: totalUsers 
    }, {
        where: {
            id: userLeague.LeagueId
        }
    });


    await UsersLeagues.update({ 
        ranking: userRanking + 1 // Adding 1 since ranking starts from 1, not 0
    }, {
        where: {
            UserId: userLeague.UserId,
            LeagueId: userLeague.LeagueId
        }
    });
}

UsersLeagues.afterCreate(async (userLeague, options) => {
    update_total(userLeague);
});

UsersLeagues.afterUpdate(async (userLeague, options) => {
    update_total(userLeague);
});

UsersLeagues.afterDestroy(async (userLeague, options) => {
    update_total(userLeague);
});

User.belongsToMany(League, { through: UsersLeagues });
League.belongsToMany(User, { through: UsersLeagues });

module.exports = UsersLeagues;