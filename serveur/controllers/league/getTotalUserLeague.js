const db = require("../../config/database")
const UsersLeagues = require("../../models/UsersLeagues")

const getTotalUserLeague = async (req, res) => {
    params = req.query

    const userLeague = await UsersLeagues.findOne({
        where: {
            LeagueId: params['league_id'],
            UserId: params['user_id']
        },
    });

    res.json(userLeague.total)
};


module.exports = {getTotalUserLeague};