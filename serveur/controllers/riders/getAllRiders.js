const Rider = require("../../models/Rider")

const getAllRiders = async (req, res) => {

    const riders = await Rider.findAll({
        order: [
            [Rider.sequelize.literal(`CASE WHEN all_time = 0 THEN 1 ELSE 0 END`), 'ASC'],
            ['all_time', 'ASC'],
            [Rider.sequelize.literal(`CASE WHEN pcs_rank = 0 THEN 1 ELSE 0 END`), 'ASC'],
            ['pcs_rank', 'ASC'],
            [Rider.sequelize.literal(`CASE WHEN uci_world = 0 THEN 1 ELSE 0 END`), 'ASC'],
            ['uci_world', 'ASC'],
        ],
    });

    res.json(riders);
};

module.exports = { getAllRiders };
