const Bet = require("../../models/Bet")

const setBetsUserRace = async (req, res) => {
    params = req.query

    const bet = await Bet.findOne({
        where: { 
            RaceId: params['race_id'],
            UserId: params['user_id'],
            LeagueId: params['league_id'],
            position: params['position'],
            BetTypeId: params['bet_type_id']
        }
    })

    if (bet === null) {
        const bet_created = await Bet.create({
            RaceId: params['race_id'],
            UserId: params['user_id'],
            LeagueId: params['league_id'],
            position: params['position'],
            RiderId: params['rider_id'],
            BetTypeId: params['bet_type_id']
        })
    } else {
        bet.RiderId = params['rider_id']
        await bet.save()
    }

    res.json(true)
};


module.exports = {setBetsUserRace};