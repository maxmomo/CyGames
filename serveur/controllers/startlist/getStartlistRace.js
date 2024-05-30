const db = require("../../config/database")

const getStartListRace = async (req, res) => {
    params = req.query
    
    const startlist = await db.query(
        "SELECT ri.*, t.id as team_id, t.name as team_name, t.nationality as team_nationality, t.jersey as team_jersey, " +
        "CASE " +
        "WHEN ur.RiderId IS NOT NULL THEN 1 " +
        "ELSE 0 " + 
        "END as is_boost " +
        "FROM startlists st " +
        "JOIN riders ri ON ri.id = st.RiderId " +
        "JOIN ridersteams rt ON rt.RiderId = ri.id AND season = :year " +
        "JOIN teams t ON t.id = rt.TeamId " +
        "LEFT JOIN userriders ur ON ur.RiderId = ri.id AND ur.LeagueId = :league_id AND ur.UserId = :user_id " +
        "WHERE " + 
        "st.RaceId = :race_id " +
        "ORDER BY t.id, ri.season_points DESC",
        {
            type: db.SELECT,
            replacements: { 
                race_id: params['race_id'],
                user_id: params['user_id'],
                league_id: params['league_id'],
                year: params['year']
            },
        }
    )

    res.json(startlist[0])
};


module.exports = {getStartListRace};