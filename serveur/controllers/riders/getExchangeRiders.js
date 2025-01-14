const db = require("../../config/database");

const getExhangeRiders = async (req, res) => {
    const params = req.query;
    const user_id = params['user_id'];
    const item = params['item'];
    
    const category = item.category_condition
    const rank = item.rank_condition
    const country = item.country_condition
    const team = item.team_condition
    
    let query_input = `
    SELECT ri.*, ur.count,
    CASE WHEN ur.riderId IS NOT NULL THEN true ELSE false END AS posseded
    FROM riders ri
    JOIN userriders ur ON ri.id = ur.riderId AND ur.userId = ${user_id}
    LEFT JOIN teams t on ri.team_id = t.id AND t.year = 2025
    WHERE
    ur.count > 1
    `

    if (category) {
        query_input += ` AND ri.category = ${category}`
    }
    if (rank) {
        query_input += ` AND ri.rank >= ${rank}`
    }
    if (country) {
        query_input +=  ` AND ri.nationality = '${country}'`
    }
    if (team) {
        query_input +=  ` AND ri.team_id = ${team}`
    }

    query_input +=  ` ORDER BY ri.rank DESC`
    
    try {

        const riders = await db.query(query_input);
        
        res.json(riders);

    } catch (error) {
        throw error;
    }
};

module.exports = { getExhangeRiders };