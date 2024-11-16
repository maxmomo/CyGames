const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const CrossWordSquare = sequelize.define('CrossWordSquare', {
    value: {
        type: DataTypes.STRING,
    },
    spe: {
        type: DataTypes.BOOLEAN,
    },
    def1: {
        type: DataTypes.STRING,
    },
    def2: {
        type: DataTypes.STRING,
    },
    direction: {
        type: DataTypes.STRING,
    },   
})

// Grid.associate = (models) => {
//     Grid.belongsToMany(models.User, {
//       through: models.UsersGrids,
//       foreignKey: 'gridId',
//     });
//     Grid.hasMany(models.UsersGridsLines, { 
//         foreignKey: 'gridId', 
//         as: 'grids' 
//     });
// };


module.exports = CrossWordSquare;