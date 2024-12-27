const db = require("../../config/database");
const UsersGridsLines = require("../../models/UsersGridsLines");

const setUserGridLines = async (req, res) => {
    const params = req.query;
    const user_id = params['user_id'];
    const grid_id = params['grid_id'];
    const grid_datas = params['grid_datas'];

    // Fonction pour calculer l'index à partir des valeurs de ligne et de colonne
    const calculateIndex = (row, col) => {
        return row * 3 + col + 1;
    };

    if (grid_datas) {
        // Parcourir toutes les données de la grille
        for (let i = 0; i < grid_datas.length; i++) {
            for (let j = 0; j < grid_datas[i].length; j++) {
                const row = grid_datas[i][j]['row'].toString(); // Convertir en chaîne de caractères
                const col = grid_datas[i][j]['col'].toString(); // Convertir en chaîne de caractères
                const rider_id = grid_datas[i][j]['rider_id'];
                
                // Calculer l'index
                const index = calculateIndex(parseInt(row), parseInt(col));
    
                try {
                    const element = await UsersGridsLines.findOne({
                        where: {
                            userId: user_id,
                            gridId: grid_id,
                            index: index
                        },
                    });

                    if (element !== null) {
                        await UsersGridsLines.update(
                            { riderId: rider_id },
                            {
                                where: {
                                    userId: user_id,
                                    gridId: grid_id,
                                    index: index
                                }
                            }
                        );
                    } else {
                        await UsersGridsLines.create({
                            userId: user_id,
                            gridId: grid_id,
                            riderId: rider_id,
                            index: index
                        })
                    }
                } catch (error) {
                    throw error;
                }
            }
        }
    }

    res.json('OK');
};

module.exports = { setUserGridLines };