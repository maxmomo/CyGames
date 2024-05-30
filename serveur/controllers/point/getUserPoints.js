const Bet = require("../../models/Bet")
const { Op } = require("sequelize");


const getUserPoints = async (req, res) => {
    params = req.query

    const bets = await Bet.findAll({
        where: {
            computed: 1,
            point: {
                [Op.ne]: 0
            },
            UserId: params['user_id'],
            LeagueId: params['league_id']
        }
    })

    res.json(bets)
};


module.exports = {getUserPoints};