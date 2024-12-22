const db = require("../../config/database");

const createUserRiders = async (req, transaction) => {
    const params = req.query;
    const user_id = parseInt(params['user_id'], 10);
    const level = parseInt(params['level'], 10);

    if (isNaN(user_id) || isNaN(level)) {
        throw new Error("Invalid parameters: user_id and level must be numbers.");
    }

    try {
        const selectedRiders = [];

        // Fonction pour sélectionner la catégorie en fonction du niveau
        const selectCategory = () => {
            const rand = Math.random();
            if (level === 1) {
                if (rand <= 0.01) return 1;
                if (rand <= 0.10) return 2;
                return 3;
            } else if (level === 2) {
                if (rand <= 0.05) return 1;
                if (rand <= 0.30) return 2;
                return 3;
            } else if (level === 3) {
                if (rand <= 0.15) return 1;
                if (rand <= 0.50) return 2;
                return 3;
            }
            return 3; // Valeur par défaut
        };

        // Sélection de 4 coureurs uniques
        while (selectedRiders.length < 4) {
            const category = selectCategory();
            console.log("Selected category:", category);

            if (!category) {
                throw new Error("Category is undefined.");
            }

            const [rider] = await db.query(
                `SELECT ri.*, 
                 CASE 
                    WHEN ri.picture IS NOT NULL AND ri.picture <> '' THEN ri.picture 
                    ELSE t.jersey 
                 END AS jersey,
                 1 as posseded
                 FROM riders ri 
                 JOIN teams t ON ri.team_id = t.id 
                 WHERE t.status = 'WT' AND year = 2025 AND ri.category = ?
                 ORDER BY RAND() 
                 LIMIT 1`,
                {
                    replacements: [category],
                    type: db.QueryTypes.SELECT,
                    transaction
                }
            );

            if (rider && !selectedRiders.some(r => r.id === rider.id)) {
                selectedRiders.push(rider);
            }
        }

        // Préparation des données pour insertion dans userriders
        const userRidersData = selectedRiders.map(rider => [
            user_id,            // userId
            rider.id,           // riderId
            new Date(),         // createdAt
            new Date(),         // updatedAt
            1                   // count initialisé à 1
        ]);

        // Insertion dans userriders avec gestion des doublons
        await db.query(
            `INSERT INTO userriders (userId, riderId, createdAt, updatedAt, count)
             VALUES ? 
             ON DUPLICATE KEY UPDATE 
             count = count + 1, updatedAt = VALUES(updatedAt)`,
            {
                replacements: [userRidersData],
                type: db.QueryTypes.INSERT,
                transaction
            }
        );

        console.log("Successfully inserted into userriders");

        return selectedRiders; // Retourne les coureurs sélectionnés
    } catch (error) {
        console.error("Error in createUserRiders:", error);
        throw error; // Relève l'erreur pour gestion en amont
    }
};

module.exports = { createUserRiders };
