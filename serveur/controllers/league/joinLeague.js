const League = require("../../models/League")
const UsersLeagues = require("../../models/UsersLeagues")

const joinLeague = async (req, res) => {
    params = req.query
    result = ""

    league = await League.findAll({
        where: {
            name: params['name'],
            password: params['password']
        }
    })
    
    if (league.length === 1) {
        userLeague = await UsersLeagues.findAll({
            where: {
                UserId: params['user_id'],
                LeagueId: league[0].id
            }
        })

        if (userLeague.length >= 1) {
            result = 1
        } else {
            await UsersLeagues.create({
                UserId: params['user_id'],
                LeagueId: league[0].id
            })
            
            result = league.id
        }
        
    } else {
        result = 0
    }
    
    res.json(result)

};


module.exports = {joinLeague};
