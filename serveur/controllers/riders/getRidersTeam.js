const db = require("../../config/database")

const getRidersTeam = async (req, res) => {
    params = req.query

    const riders = await db.query(
        "SELECT ri.* " +
        "FROM ridersteams rt " +
        "JOIN riders ri ON ri.id = rt.RiderId " +
        "WHERE " + 
        "rt.TeamId = :team_id " +
        "ORDER BY ri.odr_points + ri.gc_points + ri.tt_points + ri.sprint_points + ri.climb_points DESC",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['team_id'],
            },
        }
    )

    res.json(riders[0])
};


module.exports = {getRidersTeam};