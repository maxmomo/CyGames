const Exchange = require("../../models/Exchange")

const getAllExchanges = async (req, res) => {

    const exchanges = await Exchange.findAll({
        order: [
            ['id', 'ASC']
        ],
    });
    
    res.json(exchanges);
};

module.exports = { getAllExchanges };
