const db = require("../../config/database");

const getUserRiders = async (req, res) => {
    const params = req.query;
    const user_id = params['user_id'];

    try {
        const riders = await db.query(
            "SELECT ri.* " +
            "FROM userriders ur " +
            "JOIN riders ri ON ri.id = ur.riderId " +
            "JOIN teams t on ri.team_id = t.id " +
            "WHERE " +
            "t.status = 'WT' AND year = 2025 AND " +
            "ur.userId = :user_id",
            {
                type: db.SELECT,
                replacements: { 
                    user_id: user_id,
                },
            }
        );

        const stat = await db.query(
            "SELECT COUNT(*) as count " +
            "FROM riders ri " +
            "JOIN teams t on ri.team_id = t.id " +
            "WHERE " +
            "t.status = 'WT' AND year = 2025 " +
            "GROUP BY category " +
            "ORDER BY category",
            {
                type: db.SELECT,
            }
        );

        riders[0].push(stat[0][0]['count'])
        riders[0].push(stat[0][1]['count'])
        riders[0].push(stat[0][2]['count'])

        res.json(riders[0]);
    } catch (error) {
        throw error;
    }
};

module.exports = { getUserRiders };