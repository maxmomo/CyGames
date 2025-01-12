const db = require("../../config/database");

const getExhangeRiders = async (req, res) => {
    const params = req.query;
    const user_id = params['user_id'];
    const type = params['type'];

    const dic_type_category = {
        'silver': 3,
        'gold': 2,
        'new': 1
    }

    try {
        let riders = []
        if (type === 'silver' || type === 'gold' || type === 'new') {
            riders = await db.query(
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
                "JOIN userriders ur ON ri.id = ur.riderId AND ur.userId = :user_id " +
                "LEFT JOIN teams t on ri.team_id = t.id " +
                "WHERE " +
                "year = 2025 AND ri.category = :category AND ur.count > 1 " +
                "ORDER BY ri.rank DESC",
                {
                    type: db.SELECT,
                    replacements: { 
                        user_id: user_id,
                        category: dic_type_category[type]
                    },
                }
            );
        }

        if (!Array.isArray(riders) || riders.length === 0 || riders[0].length === 0) {
            riders = [];
        }

        res.json(riders);
    } catch (error) {
        throw error;
    }
};

module.exports = { getExhangeRiders };