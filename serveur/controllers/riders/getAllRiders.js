const Rider = require("../../models/Rider")

const getAllRiders = async (req, res) => {

    const riders = await Rider.findAll()

    res.json(riders)
};


module.exports = {getAllRiders};