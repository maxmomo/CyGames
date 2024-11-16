const db = require("../../config/database");

const createUserRiders = async (req, res) => {
    const params = req.query;

    try {
        const selectedRiders = [];
        
        // Fonction pour sélectionner une catégorie en fonction des probabilités
        const selectCategory = () => {
            const rand = Math.random();
            if (rand <= 0.1) return 1; // 10% de chance pour la catégorie 1
            if (rand <= 0.4) return 2; // 30% de chance pour la catégorie 2 (0.1 + 0.3)
            return 3;                  // 60% de chance pour la catégorie 3
        };

        while (selectedRiders.length < 3) {
            const category = selectCategory();
            
            // Sélectionnez un coureur aléatoire de la catégorie choisie
            const [rider] = await db.query(
                "SELECT ri.* " +
                "FROM riders ri " +
                "JOIN teams t ON ri.team_id = t.id " +
                "WHERE t.status = 'WT' AND year = 2025 AND ri.category = ? " +
                "ORDER BY RAND() " +
                "LIMIT 1",
                {
                    replacements: [category],
                    type: db.QueryTypes.SELECT,
                }
            );

            // Ajoutez le coureur sélectionné à la liste s'il est unique
            if (rider && !selectedRiders.some(r => r.id === rider.id)) {
                selectedRiders.push(rider);
            }
        }

        // Préparer les données pour l'insertion en masse dans `userriders`
        const userRidersData = selectedRiders.map(rider => ({
            userId: params['user_id'],
            riderId: rider.id,
            category: rider.category,
            picture: rider.picture,
            name: rider.name,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        // Insérez ou mettez à jour les coureurs sélectionnés dans `userriders`
        await db.query(
            `INSERT INTO userriders (userId, riderId, createdAt, updatedAt, count)
            VALUES ? 
            ON DUPLICATE KEY UPDATE count = count + 1, updatedAt = VALUES(updatedAt)`,
            {
                replacements: [userRidersData.map(userRider => [
                    userRider.userId,
                    userRider.riderId,
                    userRider.createdAt,
                    userRider.updatedAt,
                    1 
                ])],
                type: db.QueryTypes.INSERT,
            }
        );

        // Répondre avec les coureurs sélectionnés
        res.json(selectedRiders);

    } catch (error) {
        console.error("Error creating user riders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { createUserRiders };