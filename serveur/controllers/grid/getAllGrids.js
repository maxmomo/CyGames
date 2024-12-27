const db = require("../../config/database")

const getAllGrids = async (req, res) => {
    params = req.query

    const grids = await db.query(
        "SELECT g.id as id, level, score, validated " +
        "FROM grids g " +
        "JOIN usersgrids ug ON ug.gridId = g.id " +
        "WHERE ug.userId = :user_id ",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id']
            },
        }
    )

    res.json(grids[0])
};


module.exports = {getAllGrids};