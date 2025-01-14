const db = require("../../config/database");

const getUserRidersTeam = async (req, res) => {
    const params = req.query;
    const user_id = params['user_id'];

    try {
        const riders = await db.query(
            "SELECT ri.*, ur.count, " +
            "CASE " +
            "WHEN ur.riderId IS NOT NULL THEN true " +
            "ELSE false " +
            "END AS posseded " +
            "FROM riders ri " +
            "LEFT JOIN userriders ur ON ri.id = ur.riderId AND ur.userId = :user_id " +
            "LEFT JOIN teams t on ri.team_id = t.id " +
            "WHERE " +
            "t.year = 2025 " +
            "ORDER BY ri.rank DESC",
            {
                type: db.SELECT,
                replacements: { 
                    user_id: user_id,
                },
            }
        );

        const stat = await db.query(
            "SELECT COUNT(*) as count, t.id as team_id, t.name " +
            "FROM riders ri " +
            "JOIN teams t on ri.team_id = t.id " +
            "WHERE " +
            "t.year = 2025 " +
            "GROUP BY t.id " +
            "ORDER BY t.id",
            {
                type: db.SELECT
            }
        );

        stat[0].forEach(teamStat => {
            riders[0].push({
                team_id: teamStat.team_id,
                name: teamStat.name,
                count: teamStat.count
            });
        });

        res.json(riders[0]);
    } catch (error) {
        throw error;
    }
};

module.exports = { getUserRidersTeam };