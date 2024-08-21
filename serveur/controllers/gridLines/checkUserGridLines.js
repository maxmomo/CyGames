const db = require("../../config/database");
const Usergridslines = require("../../models/UsersGridsLines");
const Usersgrids = require("../../models/UsersGrids");

const checkUserGridLines = async (req, res) => {
    const params = req.query;
    const grid_id = params['grid_id'];
    const user_id = params['user_id'];

    try {
        const gridInformations = await db.query(
            "SELECT " +
            "gi1.element AS element1, gi1.information AS information1, gi1.additional as additional1, " +
            "gi2.element AS element2, gi2.information AS information2, gi2.additional as additional2, " +
            "gi3.element AS element3, gi3.information AS information3, gi3.additional as additional3, " +
            "gi4.element AS element4, gi4.information AS information4, gi4.additional as additional4, " +
            "gi5.element AS element5, gi5.information AS information5, gi5.additional as additional5, " +
            "gi6.element AS element6, gi6.information AS information6, gi6.additional as additional6 " +
            "FROM grids g " +
            "LEFT JOIN gridinformations gi1 ON g.i1 = gi1.id " +
            "LEFT JOIN gridinformations gi2 ON g.i2 = gi2.id " +
            "LEFT JOIN gridinformations gi3 ON g.i3 = gi3.id " +
            "LEFT JOIN gridinformations gi4 ON g.i4 = gi4.id " +
            "LEFT JOIN gridinformations gi5 ON g.i5 = gi5.id " +
            "LEFT JOIN gridinformations gi6 ON g.i6 = gi6.id " +
            "WHERE " +
            "g.id = :grid_id",
            {
                type: db.SELECT,
                replacements: { 
                    grid_id: grid_id,
                },
            }
        );

        // Initialiser un tableau pour stocker les résultats par indice i
        let list_riders = Array(6).fill([]);

        // Fonction pour mettre à jour les listes de résultats en fonction de l'indice i
        const updateListRiders = (i, riders) => {
            list_riders[i - 1] = riders.map(rider => rider.id);
        };

        // Traiter chaque information récupérée
        for (let i = 1; i <= 6; i++) {
            const element = gridInformations[0][0][`element${i}`];
            const information = gridInformations[0][0][`information${i}`];
            const additional = gridInformations[0][0][`additional${i}`];

            switch (element) {
                case 'Nationality':
                    const ridersNationality = await db.query(
                        "SELECT DISTINCT(id) " +
                        "FROM riders " +
                        "WHERE " +
                        "nationality = :nationality",
                        {
                            type: db.SELECT,
                            replacements: { 
                                nationality: information,
                            },
                        }
                    );
                    updateListRiders(i, ridersNationality[0]);
                    break;

                case 'Race':
                    const parts = additional.split('/');
                    const top = parseInt(parts[0], 10);
                    const ridersRace = await db.query(
                        `SELECT DISTINCT(ri.id) 
                         FROM riders ri 
                         JOIN results re ON re.RiderId = ri.id 
                         JOIN races ra ON re.RaceId = ra.id 
                         WHERE 
                         re.result_rank <= :top AND 
                         re.result_rank != 0 AND 
                         (ra.odr = '1' AND re.BetTypeId = 8 OR ra.odr = '0' AND re.BetTypeId = 4) AND 
                         ra.name = :race_name`,
                        {
                            type: db.SELECT,
                            replacements: { 
                                race_name: information,
                                top: top
                            },
                        }
                    );
                    
                    updateListRiders(i, ridersRace[0]);
                    break;

                default:
                    break;
            }
        }

        function findCommonIds(list1, list2) {
            return list1.filter(id => list2.includes(id));
        }

        let indexDict = {};
        
        for (let i = 1; i <= 3; i++) {
            for (let j = 4; j <= 6; j++) {
                const key = 3 * (j-4) + i; // Construction de la clé selon les spécifications
                const commonIds = findCommonIds(list_riders[i - 1], list_riders[j - 1]);
                indexDict[key] = commonIds;
            }
        }

        // Calcul du score
        let score = 0

        const lines = await Usergridslines.findAll({
            where: {
                userId: user_id,
                gridId: grid_id
            }
        })

        for (const line of lines) {
            const index = line.dataValues['index'];
            const riderId = line.dataValues['riderId'];
            if (indexDict[index].includes(riderId)) {
                score += 1;
                await Usergridslines.update(
                    { 
                        correct: 2
                    },
                    {
                        where: {
                            userId: user_id,
                            gridId: grid_id,
                            index: index
                        }
                    }
                );
            } else {
                await Usergridslines.update(
                    { 
                        correct: 1 
                    },
                    {
                        where: {
                            userId: user_id,
                            gridId: grid_id,
                            index: index
                        }
                    }
                );
            }
        }

        if (score === 9) {
            score = 3
        } else if (score > 6) {
            score = 2
        } else if (score > 4) {
            score = 1
        } else {
            score = 0
        }

        await Usersgrids.update(
            { 
                score: score,
                validated: true 
            },
            {
                where: {
                    userId: user_id,
                    gridId: grid_id
                }
            }
        );
        
        indexDict['score'] = score

        res.json(indexDict)

    } catch (error) {
        console.error('Error processing grid information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { checkUserGridLines };