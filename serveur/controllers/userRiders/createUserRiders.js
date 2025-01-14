const db = require("../../config/database");

const createUserRiders = async (req, transaction) => {

    const params = req.query;
    const user_id = params['user_id']
    const item = params['item']

    const number_riders = item.award_number;
    const category = item.award_cat
    const rider_id = item.award_rider_id
    const team_id = item.award_team_id
    const rank = item.award_rank
    const country = item.award_country
    const new_item = item.award_new

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
                    if (rand <= 0.99) return 3;
                    return 4;
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

    let query_input = `
    SELECT ri.*, COALESCE(ur.count, 0) + 1 AS count, 
    1 as posseded
    FROM riders ri 
    JOIN teams t ON ri.team_id = t.id AND t.year = 2025
    LEFT JOIN userriders ur ON ur.userId = ${user_id} AND ur.riderID = ri.id
    WHERE ri.id > 0
    `

    if (category) {
        query_input += ` AND ri.category = ${category}`
    }
    if (rider_id) {
        query_input += ` AND ri.id = ${rider_id}`
    }
    if (team_id) {
        query_input += ` AND t.id = ${team_id}`
    }
    if (rank) {
        query_input += ` AND ri.rank >= ${rank}`
    }
    if (country) {
        query_input += ` AND ri.nationality = '${country}'`
    }
    if (new_item) {
        query_input += ` AND (ur.count IS NULL OR ur.count = 0)`
    }

    query_input +=  ` ORDER BY RAND() LIMIT 1`

    try {
        const selectedRiders = [];

        // Sélection de X coureurs uniques
        while (selectedRiders.length < number_riders) {

            const [rider] = await db.query(query_input);

            if (rider && !selectedRiders.some((r) => r.id === rider.id)) {
                selectedRiders.push(rider);
            }
        }

        // Préparation des données p0our insertion dans userriders
        const userRidersData = selectedRiders[0].map(rider => [
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
                replacements: [userRidersData], 
                type: db.QueryTypes.INSERT,
                transaction
            }
        );

        return selectedRiders[0]; 
    } catch (error) {
        console.error("Error in createUserRiders:", error);
        throw error; 
    }
};

module.exports = { createUserRiders };