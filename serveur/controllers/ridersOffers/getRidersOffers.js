const db = require("../../config/database")

const getUserRidersOffer = async (req, res) => {
    params = req.query

    const offers = await db.query(
        "SELECT ri.name as rider_name, ri.id as rider_id, t.abbreviation as team_abbraviation, t.id as team_id, t.name as team_name, uro.offer as offer FROM riders ri " +
        "FROM riders ri " +
        "LEFT JOIN userridersoffers uro ON uro.RiderId = ri.id " +
        "JOIN teams t ON ri.team_id = t.id " +
        "WHERE t.status in ('WT', 'PRT', 'PT', 'PCT', 'CT') " +
        "uro.UserId = :user_id AND " +
        "uro.LeagueId = :league_id",
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