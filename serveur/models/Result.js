const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Rider = require("./Rider");
const Stage = require("./Stage");
const Race = require("./Race");
const BetType = require("./BetType");

const Result = sequelize.define('Result', {
    points: {
        type: DataTypes.INTEGER,
    },
    result_rank: {
        type: DataTypes.INTEGER,
    },
    RiderId: {
        type: DataTypes.INTEGER,
        references: {
            model: Rider,
            key: 'id'
        }
    },
    StageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Stage,
            key: 'id'
        }
    },
    RaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Race,
            key: 'id'
        }
    },
    BetTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: BetType,
            key: 'id'
        }
    }
});

Rider.hasMany(Result, { foreignKey: 'RiderId' });
Result.belongsTo(Rider, { foreignKey: 'RiderId' });

Stage.hasMany(Result, { foreignKey: 'StageId' });
Result.belongsTo(Stage, { foreignKey: 'StageId' });

Race.hasMany(Result, { foreignKey: 'RaceId' });
Result.belongsTo(Race, { foreignKey: 'RaceId' });

BetType.hasMany(Result, { foreignKey: 'BetTypeId' });
Result.belongsTo(BetType, { foreignKey: 'BetTypeId' });

module.exports = Result;