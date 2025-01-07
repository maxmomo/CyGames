const db = require("../../config/database");

const createUserRiders = async (req, transaction) => {
    const params = req.query;
    const user_id = parseInt(params['user_id'], 10);
    const level = parseInt(params['level'], 10);
    const type = params['type']
    let number_riders = 0;

    pack_types = ['bronze', 'argent', 'or']

    if (level < 4 || pack_types.includes(type)) {
        number_riders = 4
    } else if (level === 4) {
        number_riders = 1
    }

    try {
        const selectedRiders = [];

        const selectCategory = () => {
            const rand = Math.random();
            if (level) {
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
                } else if (level === 4) {
                    if (type === 'silver') {
                        return 2
                    } else if (type === 'gold') {
                        return 1
                    } else if (type === 'new') {
                        if (rand <= 0.33) return 1;
                        if (rand <= 0.66) return 2;
                        return 3;
                    }
                }
                return 3;
            } else if (type) {
                if (type === 'bronze') {
                    return 3
                } else if (type === 'argent') {
                    return 2
                } else if (type === 'or') {
                    return 1
                }
            }
        };

        // Sélection de X coureurs uniques
        while (selectedRiders.length < number_riders) {
            const category = selectCategory();

            if (!category) {
                throw new Error("Category is undefined.");
            }

            const queryBase = `
                SELECT ri.*, COALESCE(ur.count, 0) + 1 AS count,  
                CASE 
                    WHEN ri.picture IS NOT NULL AND ri.picture <> '' THEN ri.picture 
                    ELSE t.jersey 
                END AS jersey,
                1 as posseded
                FROM riders ri 
                JOIN teams t ON ri.team_id = t.id 
                LEFT JOIN userriders ur ON ur.userId = ? AND ur.riderID = ri.id
                WHERE t.status = 'WT' AND year = 2025 AND ri.category = ?
            `;

            const queryCondition = type === 'new' 
                ? `AND (ur.count IS NULL OR ur.count = 0)` 
                : ``;

            const queryOrder = `ORDER BY RAND() LIMIT 1`;

            const [rider] = await db.query(
                `${queryBase} ${queryCondition} ${queryOrder}`,
                {
                    replacements: [user_id, category],
                    type: db.QueryTypes.SELECT,
                    transaction,
                }
            );

            if (rider && !selectedRiders.some((r) => r.id === rider.id)) {
                selectedRiders.push(rider);
            }
        }

        // Préparation des données pour insertion dans userriders
        const userRidersData = selectedRiders.map(rider => [
            user_id,            
            rider.id,           
            new Date(),         
            new Date(),         
            1                   
        ]);

        // Insertion dans userriders avec gestion des doublons
        await db.query(
            `INSERT INTO userriders (userId, riderId, createdAt, updatedAt, count)
             VALUES ?
             ON DUPLICATE KEY UPDATE 
             count = count + 1, updatedAt = CURRENT_TIMESTAMP`,
            {
                replacements: [userRidersData], // Transmettez les données ici
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
