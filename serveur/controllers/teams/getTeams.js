const Team = require("../../models/Team")

const getTeams = async (req, res) => {
    params = req.query

    const teams = await Team.findAll({
        where: {
            year: params['year'],
        }
    })

    res.json(teams)
};


module.exports = {getTeams};