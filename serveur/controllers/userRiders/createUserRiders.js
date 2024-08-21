const db = require("../../config/database");

const cretaUserRiders = async (req, res) => {
    const params = req.query;
    
    try {
        // Select rider IDs along with category, picture, and name
        const riders = await db.query(
            "SELECT id, category, picture, name " +
            "FROM riders ri " +
            "WHERE (category = 1 AND RAND() <= 0.3) OR (category = 2 AND RAND() <= 1) OR (category = 3 AND RAND() <= 1) " +
            "ORDER BY RAND() " +
            "LIMIT 6",
            {
                type: db.QueryTypes.SELECT,
            }
        );

        // Prepare bulk insert data for userriders
        const userRidersData = riders.map(rider => ({
            user_id: params['user_id'], // Ensure user_id is passed in the query parameters
            rider_id: rider.id,
            category: rider.category,
            picture: rider.picture,
            name: rider.name,
            createdAt: new Date(), // Set the current date and time for createdAt
            updatedAt: new Date() // Set the current date and time for updatedAt
        }));

        // Insert userriders into the database
        await db.query(
            "INSERT INTO userriders (userId, riderId, createdAt, updatedAt) VALUES ?",
            {
                replacements: [userRidersData.map(userRider => [
                    userRider.user_id,
                    userRider.rider_id,
                    userRider.createdAt,
                    userRider.updatedAt
                ])],
                type: db.QueryTypes.INSERT,
            }
        );

        // Respond with the created userriders, including category, picture, and name
        res.json(userRidersData);

    } catch (error) {
        console.error("Error creating user riders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { cretaUserRiders };