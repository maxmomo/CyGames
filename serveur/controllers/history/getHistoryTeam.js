const Team = require("../../models/Team")
const { Op } = require("sequelize");

const getHistoryTeam = async (req, res) => {
    params = req.query

    const teams = await Team.findAll({
        where: {
            related_team_id: params['related_team_id'],
            year: {
                [Op.lt]: parseInt(params['year']) + 1,
                [Op.ne]: parseInt(params['team_year'])
            }
        },
        order: [
            ['year', 'DESC']
        ]
    });
    

    res.json(teams)
};


module.exports = {getHistoryTeam};