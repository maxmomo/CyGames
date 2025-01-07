const Pack = require("../../models/Pack")

const getAllPacks = async (req, res) => {

    const packs = await Pack.findAll({
        order: [
            ['price', 'ASC']
        ],
    });

    res.json(packs);
};

module.exports = { getAllPacks };
