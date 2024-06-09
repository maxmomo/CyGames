const Rider = require("../../models/Rider")

const getAllRiders = async (req, res) => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

    const riders = await Rider.findAll()

    res.json(riders)
};


module.exports = {getAllRiders};