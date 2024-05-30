const League = require("../../models/League")
const UsersLeagues = require("../../models/UsersLeagues")
const UserRidersOffers= require("../../models/UserRidersOffer")
const UserRiders= require("../../models/UserRiders")
const Bet = require("../../models/Bet")

const quitLeague = async (req, res) => {
    params = req.query
    result = ""
    
    await UsersLeagues.destroy({
        where: {
            UserId: params['user_id'],
            LeagueId: params['league_id']
        }
    })

    await UserRidersOffers.destroy({
        where: {
            UserId: params['user_id'],
            LeagueId: params['league_id']
        }
    })

    await UserRiders.destroy({
        where: {
            UserId: params['user_id'],
            LeagueId: params['league_id']
        }
    })

    await Bet.destroy({
        where: {
            UserId: params['user_id'],
            LeagueId: params['league_id']
        }
    })

    res.json('ok')

};


module.exports = {quitLeague};
