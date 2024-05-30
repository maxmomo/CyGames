// import db from "../config/database.js"
const db = require("../../config/database")

const getStatisticsTeam = async (req, res) => {
    params = req.query
    
    const statistics = await db.query(
        "SELECT ri.fullName AS rider_name, ri.id AS rider_id, ra.name AS race_name, ra.id AS race_id, ra.season AS season, s.name AS stage_name, s.id AS stage_id, ri.nationality as nationality " +
        "FROM results re " +
        "JOIN riders ri ON ri.id = re.RiderId " +
        "JOIN races ra ON ra.id = re.RaceId " +
        "JOIN stages s ON s.id = re.StageId " +
        "JOIN teams t2 ON t2.related_team_id = :team_id " +
        "JOIN ridersteams rt ON rt.RiderId = re.RiderId AND rt.TeamId = t2.id AND ra.season = rt.season " +
        "WHERE " + 
        "re.result_rank = 1 AND " +
        "re.BetTypeId in (8, 14, 15) " +
        "GROUP BY ra.id, s.id " +
        "ORDER BY ra.season DESC, s.date DESC",
        {
            type: db.SELECT,
            replacements: { 
                team_id: params['related_team_id'],
            },
        }
    )

    res.json(statistics)
};


module.exports = {getStatisticsTeam};