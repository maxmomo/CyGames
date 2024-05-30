const League = require("../../models/League")
const UsersLeagues = require("../../models/UsersLeagues")

const createLeague = async (req, res) => {
    params = req.query
    result = ""

    leagues = await League.findAll({
        where: {
            name: params['name']
        }
    })

    if (leagues.length == 0) {
        const league = await League.create({
            name: params['name'],
            password: params['password'],
        })

        await UsersLeagues.create({
            UserId: params['user_id'],
            LeagueId: league.id
        })
        
        result = league
    } else {
        result = false
    }
    
    res.json(result)

};


module.exports = {createLeague};