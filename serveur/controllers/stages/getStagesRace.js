const Stage = require("../../models/Stage")

const getStagesRace = async (req, res) => {
    params = req.query

    const stages = await Stage.findAll({
        where: {
            race_id: params['race_id']
        },
        order: [
            ['date', 'ASC']
        ]
    });

    res.json(stages)
};


module.exports = {getStagesRace};