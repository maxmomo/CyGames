const db = require("../../config/database")

const getLeaguesUser = async (req, res) => {
    params = req.query

    const leagues = await db.query(
        "SELECT l.*, ul.total, ul.ranking " +
        "FROM usersleagues ul " +
        "JOIN leagues l ON l.id = ul.LeagueId " +
        "WHERE " + 
        "ul.UserId = :user_id",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id'],
            },
        }
    )

    res.json(leagues[0])
};


module.exports = {getLeaguesUser};