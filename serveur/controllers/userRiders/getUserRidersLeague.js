const db = require("../../config/database")

const getUserRidersLeague = async (req, res) => {
    params = req.query

    const riders = await db.query(
        "SELECT ri.*, rt.TeamId as team_id, t.name as team_name " +
        "FROM riders ri " +
        "JOIN userriders ur ON ur.RiderId = ri.id " +
        "JOIN ridersteams rt ON rt.season = 2024 AND rt.RiderId = ri.id " +
        "JOIN teams t ON rt.TeamId = t.id " +
        "WHERE ur.UserId = :user_id AND " +
        "t.status = 'WT' AND year = 2024 AND " +
        "ur.LeagueId = :league_id " + 
        "ORDER BY ri.season_points DESC",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id'],
                league_id: params['league_id'],
            },
        }
    )

    res.json(riders[0])
};


module.exports = {getUserRidersLeague};