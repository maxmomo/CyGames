const UsersGrids = require("../../models/UsersGrids");
const { createUserRiders } = require("../userRiders/createUserRiders");
const db = require("../../config/database");

const awardGrid = async (req, res) => {
    const params = req.query;

    // Validation stricte des paramètres
    const user_id = parseInt(params['user_id'], 10);
    const grid_id = parseInt(params['grid_id'], 10);
    const level = parseInt(params['level'], 10);

    if (isNaN(user_id) || isNaN(grid_id) || isNaN(level)) {
        return res.status(400).json({ error: "Invalid parameters: user_id, grid_id, and level must be numbers." });
    }

    const transaction = await db.transaction(); // Début de la transaction

    try {
        // Étape 1 : Mettre à jour UsersGrids
        const updateResult = await UsersGrids.update(
            { awarded: true },
            { where: { userId: user_id, gridId: grid_id }, transaction }
        );

        if (updateResult[0] === 0) {
            await transaction.rollback();
            return res.status(404).json({ error: "Grid not found or already awarded." });
        }

        // Étape 2 : Créer les coureurs récompensés
        const riders = await createUserRiders(req, transaction);

        // Commit : tout a réussi, on valide la transaction
        await transaction.commit();

        res.json(riders);

    } catch (error) {
        // En cas d'erreur, on annule la transaction
        await transaction.rollback();
        console.error("Error in awardGrid:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { awardGrid };