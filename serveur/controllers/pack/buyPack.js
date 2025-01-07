const User = require("../../models/User");
const { createUserRiders } = require("../userRiders/createUserRiders");
const db = require("../../config/database");

const buyPack = async (req, res) => {
    const params = req.query;

    const user_id = params['user_id'];
    const price = parseFloat(params['price']);

    const transaction = await db.transaction(); // Début de la transaction

    try {
        // Étape 1 : Récupérer le crédit actuel de l'utilisateur
        const user = await User.findOne({ where: { id: user_id }, transaction });

        if (!user) {
            console.error("Utilisateur introuvable");
            throw new Error("User not found");
        }


        if (user.credit < price) {
            console.error("Crédits insuffisants");
            throw new Error("Insufficient credit");
        }

        // Calculer le nouveau crédit
        const newCredit = user.credit - price;


        // Mettre à jour le crédit de l'utilisateur
        await User.update(
            { credit: newCredit },
            { where: { id: user_id }, transaction }
        );

        // Étape 3 : Créer les coureurs récompensés
        const riders = await createUserRiders(req, transaction);

        // Commit : tout a réussi, on valide la transaction
        await transaction.commit();

        res.json(riders);
    } catch (error) {
        // En cas d'erreur, on annule la transaction
        console.error("Erreur lors de l'achat du pack :", error);
        await transaction.rollback();
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { buyPack };