const xlsx = require('xlsx');
const Crossword = require("../models/CrossWord");
const CrosswordSquare = require("../models/CrosswordSquare");
const { Op } = require('sequelize');
const CrossWord = require('../models/CrossWord');


const level = 4
const filePath = `C:/Users/maxim/Desktop/Import/Niveau${level}.xlsx`; // Remplacez par le chemin de votre fichier

importCrosswordData(); 

async function importCrosswordData() {
    // Charger et lire le fichier Excel
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets['Feuil1'];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Initialiser les données à insérer
    const crosswordSquaresData = [];
    
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'W', 'Y', 'Z']
    
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const position = `${alphabet[col]}${row + 1}`; // 'A1', 'A2', ...
            const value = data[row][col] || ''; // Valeur de la case
        
            // Créer une entrée pour crosswordsquares
            const squareData = {
                value: value || null,
                spe: 0,
                def1: null,
                def2: null,
                direction: null,
                position: position
            };
            crosswordSquaresData.push(squareData);

        }
    }

    // Extraire les cases spéciales avec définitions
    for (let i = 0; i < data.length; i++) {
        if(data[i].length > 11) {
            const position = data[i][11];
            const def1 = data[i][12];
            const def2 = data[i][13];
            const direction = data[i][14];


            const square = crosswordSquaresData.find(sq => position === sq.position);
            if (square) {
                square.spe = 1;
                square.def1 = def1 || null;
                square.def2 = def2 || null;
                square.direction = direction;
            }
        }
    }

    // Insertion des données en base de données
    let datas_to_import = {
        level: level,
        A1: '', A2: '', A3: '', A4: '', A5: '', A6: '', A7: '', A8: '', A9: '', A10: '',
        B1: '', B2: '', B3: '', B4: '', B5: '', B6: '', B7: '', B8: '', B9: '', B10: '',
        C1: '', C2: '', C3: '', C4: '', C5: '', C6: '', C7: '', C8: '', C9: '', C10: '',
        D1: '', D2: '', D3: '', D4: '', D5: '', D6: '', D7: '', D8: '', D9: '', D10: '',
        E1: '', E2: '', E3: '', E4: '', E5: '', E6: '', E7: '', E8: '', E9: '', E10: '',
        F1: '', F2: '', F3: '', F4: '', F5: '', F6: '', F7: '', F8: '', F9: '', F10: '',
        G1: '', G2: '', G3: '', G4: '', G5: '', G6: '', G7: '', G8: '', G9: '', G10: '',
        H1: '', H2: '', H3: '', H4: '', H5: '', H6: '', H7: '', H8: '', H9: '', H10: '',
        I1: '', I2: '', I3: '', I4: '', I5: '', I6: '', I7: '', I8: '', I9: '', I10: '',
        J1: '', J2: '', J3: '', J4: '', J5: '', J6: '', J7: '', J8: '', J9: '', J10: '',
    }
    try {
        // Filtrer les cases spéciales uniquement (spe = 1)
        const specialSquaresData = crosswordSquaresData.filter(square => square.spe === 1);

        console.log(specialSquaresData)

        for (const square of specialSquaresData) {
            // Vérifier si une case avec les mêmes 'valeur', 'def1' et 'def2' existe déjà
            const existingSquare = await CrosswordSquare.findOne({
                where: {
                    value: square.value,
                    def1: square.def1,
                    def2: square.def2
                }
            });

            // Si la case n'existe pas, l'insérer
            if (!existingSquare) {
                const special_square = await CrosswordSquare.create(square);
                datas_to_import[square['position']] = special_square['dataValues']['id']
                console.log(`Case insérée : ${JSON.stringify(square)}`);
            } else {
                console.log(`Case déjà existante, ignorée : ${JSON.stringify(square)}`);
            }
        }

        // Maintenant on fait l'import de toutes les cases avec valeur mais pas spé

        const valueSquaresData = crosswordSquaresData.filter(square => square.spe === 0 && square.value !== null);
        for (const square of valueSquaresData) {
            datas_to_import[square['position']] = square['value'].charCodeAt(0) - 64
        }

        // Vérifier si une grille avec le même niveau existe déjà
        const existingCrossWord = await CrossWord.findOne({
            where: {
                level: level
            }
        });
        // Si la grille n'existe pas, l'insérer
        if (!existingCrossWord) {
            await CrossWord.create(datas_to_import);
            console.log(`Grille insérée : ${JSON.stringify(datas_to_import)}`);
        } else {
            console.log(`Grille déjà existante, ignorée : ${JSON.stringify(datas_to_import)}`);
        }


        console.log('Importation terminée avec succès.');
    } catch (error) {
        console.error('Erreur lors de l\'importation des données :', error);
    }
}