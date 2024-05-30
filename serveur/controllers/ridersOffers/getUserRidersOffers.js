const db = require("../../config/database")

const getUserRidersOffer = async (req, res) => {
    params = req.query

    const offers = await db.query(
        "SELECT ri.picture as picture, ri.odr_points, ri.gc_points, ri.tt_points, ri.sprint_points, ri.climb_points, ri.fullName as rider_name, ri.id as rider_id, ri.nationality as nationality, t.abbreviation as team_abbreviation, t.id as team_id, t.status as team_status, t.name as team_name, uro.offer as offer, uro.state as state, " +
        "season_points + 1 as cost " +
        "FROM riders ri " +
        "JOIN userridersoffers uro ON uro.RiderId = ri.id AND uro.UserId = :user_id AND uro.LeagueId = :league_id " +
        "JOIN teams t ON ri.team_id = t.id " +
        "LEFT JOIN userriders ur ON ur.RiderId = ri.id AND ur.LeagueId = :league_id " +
        "WHERE t.status in ('WT', 'PRT') AND " +
        "ur.RiderId IS NULL " +
        "ORDER BY uro.offer DESC",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id'],
                league_id: params['league_id'],
            },
        }
    )

    res.json(offers[0])
};


module.exports = {getUserRidersOffer};