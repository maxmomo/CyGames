const Team = require("../../models/Team")

const getTeam = async (req, res) => {
    params = req.query

    const team = await Team.findOne({
        where: {
            id: params['id'],
        }
    })

    res.json(team)
};


module.exports = {getTeam};