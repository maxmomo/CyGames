const db = require("../../config/database")

const getNextRace = async (req, res) => {

    const next_race = await db.query(
        "SELECT *, id as race_id " +
        "FROM races " +
        "WHERE end_date > CURRENT_DATE " +
        "ORDER BY end_date",
        {
            type: db.SELECT,
        }
    )

    res.json(next_race[0])
};


module.exports = {getNextRace};