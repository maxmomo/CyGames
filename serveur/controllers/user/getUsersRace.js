const db = require("../../config/database")

const getUsersRace = async (req, res) => {
    params = req.query

    const users = await db.query(
        "SELECT u.*, ul.total, COALESCE(SUM(b.point), 0) AS points " +
        "FROM usersleagues ul " +
        "JOIN users u ON u.id = ul.UserId " +
        "LEFT JOIN bets b ON b.RaceId = :race_id AND b.LeagueId = :league_id AND ul.UserId = b.UserId " +
        "WHERE " + 
        "ul.LeagueId = :league_id AND " +
        "b.StageId IS NULL " +
        "GROUP BY ul.UserId " +
        "ORDER BY points DESC",
        {
            type: db.SELECT,
            replacements: { 
                league_id: params['league_id'],
                race_id: params['race_id'],
            },
        }
    )

    res.json(users[0])
};


module.exports = {getUsersRace};