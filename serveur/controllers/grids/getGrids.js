const Grid = require("../../models/Grid")

const getGrids = async (req, res) => {
    params = req.query

    const grids = await Grid.findAll()

    res.json(grids)
};


module.exports = {getGrids};