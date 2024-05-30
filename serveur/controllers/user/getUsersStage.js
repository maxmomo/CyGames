const db = require("../../config/database")

const getUsersStage = async (req, res) => {
    params = req.query

    const users = await db.query(
        "SELECT u.*, ul.total, COALESCE(SUM(b.point), 0) AS points " +
        "FROM usersleagues ul " +
        "JOIN users u ON u.id = ul.UserId " +
        "LEFT JOIN bets b ON b.RaceId = :race_id AND b.LeagueId = :league_id AND b.StageId = :stage_id AND ul.UserId = b.UserId " +
        "WHERE " + 
        "ul.LeagueId = :league_id " +
        "GROUP BY ul.UserId " +
        "ORDER BY points DESC",
        {
            type: db.SELECT,
            replacements: { 
                league_id: params['league_id'],
                race_id: params['race_id'],
                stage_id: params['stage_id'],
            },
        }
    )

    res.json(users[0])
};


module.exports = {getUsersStage};