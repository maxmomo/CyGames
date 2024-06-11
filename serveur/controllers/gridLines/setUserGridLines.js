const db = require("../../config/database");
const UsersGridsLines = require("../../models/UsersGridsLines");

const setUserGridLines = async (req, res) => {
    const params = req.query;
    const user_grid_id = params['grid_id'];
    const grid_datas = params['grid_datas'];

    console.log("Starting upserts...");

    // Fonction pour calculer l'index à partir des valeurs de ligne et de colonne
    const calculateIndex = (row, col) => {
        return row * 3 + col + 1;
    };

    // Parcourir toutes les données de la grille
    for (let i = 0; i < grid_datas.length; i++) {
        for (let j = 0; j < grid_datas[i].length; j++) {
            const row = grid_datas[i][j]['row'].toString(); // Convertir en chaîne de caractères
            const col = grid_datas[i][j]['col'].toString(); // Convertir en chaîne de caractères
            const rider_id = grid_datas[i][j]['id'];

            // Calculer l'index
            const index = calculateIndex(parseInt(row), parseInt(col));

            try {
                // Effectuer l'upsert
                await UsersGridsLines.upser({
                    usersGridsId: user_grid_id,
                    riderId: rider_id,
                    index: index
                }, {
                    where: {
                        usersGridsId: user_grid_id,
                        index: index
                    }
                });
            } catch (error) {
                console.error("Error during upsert:", error);
                throw error;
            }
        }
    }

    res.json('OK');
};

module.exports = { setUserGridLines };