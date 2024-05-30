const db = require("../../config/database")

const getResultsRace = async (req, res) => {
    params = req.query
    const results = await db.query(
        "SELECT r.id, r.BetTypeId as type_id , r.result_rank as position, ri.id as rider_id, ri.name as name, ri.firstName as firstName, ri.fullName as fullName, ri.nationality as nationality, ri.picture as picture, " +
        "CASE " +
        "WHEN ur.RiderId IS NOT NULL THEN 1 " +
        "ELSE 0 " + 
        "END as is_boost " +
        "FROM results r " +
        "JOIN riders ri ON ri.id = r.RiderId " +
        "LEFT JOIN userriders ur ON ur.RiderId = ri.id AND ur.UserId = :user_id AND ur.LeagueId = :league_id " + 
        "WHERE " +
        "r.RaceId = :race_id AND " +
        "r.StageId IS NULL or r.StageId = 0",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id'],
                race_id: params['race_id'],
                league_id: params['league_id']
            },
        }
    )

    res.json(results[0])
};

module.exports = {getResultsRace};