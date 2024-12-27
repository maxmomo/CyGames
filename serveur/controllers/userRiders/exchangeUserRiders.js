const UserRiders = require("../../models/UserRiders");
const { createUserRiders } = require("../userRiders/createUserRiders");
const db = require("../../config/database");

const exchangeUserRiders = async (req, res) => {
    const params = req.query;

    const user_id = parseInt(params['user_id'], 10);
    const riders = params['riders']

    try {
        // Étape 1 : Mettre à jour le compteur de riders 
        for (const rider of riders) {
            await UserRiders.update(
                { count: db.literal('count - 1') }, 
                { 
                    where: { userId: user_id, riderId: rider.id }
                }
            );
        }


        // Étape 2 : Créer les coureurs récompensés
        const riders_created = await createUserRiders(req);

        res.json(riders_created);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { exchangeUserRiders };