const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');
const Rider = require("./Rider")
const User = require('./User')
const UsersLeagues = require('./UsersLeagues')

const UserRidersOffer = sequelize.define('UserRidersOffer', 
    {
        offer: {
            type: DataTypes.INTEGER
        },
        LeagueId: {
            type: DataTypes.INTEGER
        },
        state: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, 
    {
        hooks: {
            afterCreate: async (userRiderOffer, options) => {
                console.log("After create triggered");
                update_total(userRiderOffer);
            },
            afterUpdate: async (userRiderOffer, options) => {
                console.log("After update triggered");
                update_total(userRiderOffer);
            },
            afterDestroy: async (userRiderOffer, options) => {
                console.log("Before destroy triggered");
                update_total(userRiderOffer);
            }
        }
    }
);

const update_total = async (userRiderOffer) => {
    const totalOfferAmount = await UserRidersOffer.sum('offer', {
        where: {
            UserId: userRiderOffer.UserId,
            LeagueId: userRiderOffer.LeagueId,
            state: { [Op.ne]: 2 }
        }
    });

    await UsersLeagues.update({ 
        total: 200 - totalOfferAmount 
    }, {
        where: {
            UserId: userRiderOffer.UserId,
            LeagueId: userRiderOffer.LeagueId,
        }
    });
}

Rider.belongsToMany(User, { through: UserRidersOffer });
User.belongsToMany(Rider, { through: UserRidersOffer });

module.exports = UserRidersOffer;