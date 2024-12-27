const db = require("../../config/database")

const getGrid = async (req, res) => {
    params = req.query

    const grids = await db.query(
        "SELECT g.id as id, level, score, validated, awarded, " +
        "gi1.element as e1, gi1.information as i1, gi1.additional as a1, " +
        "gi2.element as e2, gi2.information as i2, gi2.additional as a2, " +
        "gi3.element as e3, gi3.information as i3, gi3.additional as a3, " +
        "gi4.element as e4, gi4.information as i4, gi4.additional as a4, " +
        "gi5.element as e5, gi5.information as i5, gi5.additional as a5, " +
        "gi6.element as e6, gi6.information as i6, gi6.additional as a6 " +
        "FROM grids g " +
        "JOIN usersgrids ug ON ug.gridId = g.id " +
        "JOIN gridinformations gi1 ON gi1.id = g.i1 " +
        "JOIN gridinformations gi2 ON gi2.id = g.i2 " +
        "JOIN gridinformations gi3 ON gi3.id = g.i3 " +
        "JOIN gridinformations gi4 ON gi4.id = g.i4 " +
        "JOIN gridinformations gi5 ON gi5.id = g.i5 " +
        "JOIN gridinformations gi6 ON gi6.id = g.i6 " +
        "WHERE ug.userId = :user_id AND ug.gridId = :grid_id",
        {
            type: db.SELECT,
            replacements: { 
                user_id: params['user_id'],
                grid_id: params['grid_id']
            },
        }
    )

    res.json(grids[0][0])
};


module.exports = {getGrid};