const db = require("../../config/database");

const getAllCrossWords = async (req, res) => {
    try {
        // Récupérer tous les `crosswords` avec leurs `id` et `level`
        const crosswords = await db.query(
            `SELECT * FROM crosswords`,
            { type: db.QueryTypes.SELECT }
        );

        if (crosswords.length === 0) {
            return res.status(404).json({ error: "No crosswords found" });
        }

        // Extraire tous les IDs uniques de `crosswordsquares` pour minimiser les requêtes
        const squareIds = [];
        crosswords.forEach(crossword => {
            Object.values(crossword).forEach(value => {
                if (Number.isInteger(value) && !squareIds.includes(value)) {
                    squareIds.push(value);
                }
            });
        });

        // Récupérer les détails des cases en une seule requête
        const crossWordsSquares = await db.query(
            `SELECT * FROM crosswordsquares WHERE id IN (:squareIds)`,
            {
                replacements: { squareIds },
                type: db.QueryTypes.SELECT
            }
        );

        // Associer les cases `crosswordsquares` par leur ID pour un accès rapide
        const squaresMap = crossWordsSquares.reduce((map, square) => {
            map[square.id] = {
                id: square.id,
                value: square.value,
                spe: square.spe,
                def1: square.def1,
                def2: square.def2,
                direction: square.direction
            };
            return map;
        }, {});

        // Structurer chaque `crossword` avec ses cases
        const structuredCrossWords = crosswords.map(crossWord => {
            const structuredCrossWord = {
                id: crossWord.id,
                level: crossWord.level,
                squares: {}
            };

            for (const [position, squareId] of Object.entries(crossWord)) {
                if (Number.isInteger(squareId) && squaresMap[squareId]) {
                    structuredCrossWord.squares[position] = squaresMap[squareId];
                }
            }

            return structuredCrossWord;
        });

        res.json(structuredCrossWords);
    } catch (error) {
        console.error('Erreur lors de la récupération des mots croisés:', error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des mots croisés.' });
    }
};

module.exports = { getAllCrossWords };
