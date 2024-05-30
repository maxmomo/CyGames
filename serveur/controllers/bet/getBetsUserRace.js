const db = require("../../config/database")

const getBetsUserRace = async (req, res) => {
    params = req.query

    const bets = await db.query(
        "SELECT b.id, b.point, b.BetTypeId as type_id , b.position as position, ri.id as rider_id, ri.name as name, ri.firstName as firstName, ri.fullName as fullName, ri.nationality as nationality, ri.picture as picture, " +
        "CASE " +
        "WHEN ur.RiderId IS NOT NULL THEN 1 " +
        "ELSE 0 " + 
        "END as is_boost " +
        "FROM bets b " +
        "JOIN riders ri ON ri.id = b.RiderId " +
        "LEFT JOIN userriders ur ON ur.RiderId = ri.id AND ur.UserId = :user_id AND ur.LeagueId = :league_id " + 
        "WHERE " +
        "b.RaceId = :race_id AND " +
        "b.UserId = :user_id AND " +
        "b.LeagueId = :league_id AND " +
        "b.StageId IS NULL",
        {
            type: db.SELECT,
            replacements: { 
                race_id: params['race_id'],
                user_id: params['user_id'],
                league_id: params['league_id']
            },
        }
    )

    res.json(bets[0])
};

module.exports = {getBetsUserRace};