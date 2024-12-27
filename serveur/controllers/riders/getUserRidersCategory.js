const db = require("../../config/database");

const getUserRidersCategory = async (req, res) => {
    const params = req.query;
    const user_id = params['user_id'];

    try {
        const riders = await db.query(
            "SELECT ri.*, ur.count, " +
            "CASE " +
            "WHEN ur.riderId IS NOT NULL THEN true " +
            "ELSE false " +
            "END AS posseded, " +
            "CASE " +
            "WHEN ri.picture IS NOT NULL AND ri.picture <> '' THEN ri.picture " +
            "ELSE t.jersey " +
            "END AS jersey " +
            "FROM riders ri " +
            "LEFT JOIN userriders ur ON ri.id = ur.riderId AND ur.userId = :user_id " +
            "LEFT JOIN teams t on ri.team_id = t.id " +
            "WHERE " +
            "t.status = 'WT' AND year = 2025 " +
            "ORDER BY ri.rank DESC",
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
                type: db.SELECT
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

module.exports = { getUserRidersCategory };