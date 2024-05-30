const Rider = require("../../models/Rider")
const RidersTeam = require("../../models/RidersTeams")
const StartList = require("../../models/Startlist")
const Results = require("../../models/Result")

const getRiders = async (req, res) => {
    params = req.query

    const riders = await Rider.findAll({
        where: {
            id: 1
        }
    })

    res.json(riders)
};


module.exports = {getRiders};