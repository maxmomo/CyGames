const UsersGridsLines = require("../../models/UsersGridsLines");
const UsersGrids = require("../../models/UsersGrids");

const retryGrid = async (req, res) => {
    const params = req.query
    const user_id = params['user_id'];
    const grid_id = params['grid_id'];

    await UsersGridsLines.update(
        { correct: 0 },
        {
            where: {
                userId: user_id,
                gridId: grid_id,
            }
        }
    );

    await UsersGrids.update(
        { validated: false },
        {
            where: {
                userId: user_id,
                gridId: grid_id,
            }
        }
    );


   

    res.json('Ok')
};


module.exports = {retryGrid};