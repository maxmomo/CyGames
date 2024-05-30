const db = require("../../config/database")

const getHistoryRidersOffer = async (req, res) => {
    params = req.query

    const offers = await db.query(
        "SELECT uro.offer, uro.RiderId, uro.state, ri.fullName, ri.nationality, u.userName, u.id as user_id " +
        "FROM userridersoffers uro " +
        "JOIN riders ri ON uro.RiderId = ri.id " +
        "JOIN users u ON uro.UserId = u.id " +
        "WHERE uro.LeagueId = :league_id AND " +
        "uro.state in (1,2) " +
        "ORDER BY uro.offer DESC",
        {
            type: db.SELECT,
            replacements: { 
                league_id: params['league_id'],
            },
        }
    )

    res.json(offers[0])
};


module.exports = {getHistoryRidersOffer};