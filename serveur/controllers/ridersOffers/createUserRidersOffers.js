const UserRidersOffer = require("../../models/UserRidersOffer")

const createUserRidersOffers = async (req, res) => {
    params = req.query

    const existingOffer = await UserRidersOffer.findOne({
        where: {
            RiderId: params['rider_id'],
            LeagueId: params['league_id'],
            UserId: params['user_id']
        }
    });

    if (existingOffer) {
        await existingOffer.update({ offer: params['offer'] });
    } else {
        await UserRidersOffer.create({
            RiderId: params['rider_id'],
            LeagueId: params['league_id'],
            UserId: params['user_id'],
            offer: params['offer'],
        });
    }

    res.json(true)
};


module.exports = {createUserRidersOffers};