const Bet = require("../models/Bet")
const Result = require("../models/Result")
const UserRiders = require("../models/UserRiders")

// L'objectif de ce script est de calculer les points des paris des utilisateurs

// Pour un classement général :
// 100 points pour un vainqueur trouvé
// 50 points pour un podium trouvé 
// 20 points pour un top 10 trouvé

// Pour classement par point / montagne / jeune
// 50 points pour un vainqueur trouvé
// 20 points pour un podium trouvé

// Pour un classement d'étape
// 10 points pour un vainqueur trouvé
// 5 points pour un podium trouvé

// Les points sont multipliés par 2 si le coureur appartient à l'équipe de l'utilisateur

async function processResults() {
    const bets = await Bet.findAll({ 
        where: { 
            computed: false
        } 
    });
    
    for (const bet of bets) {

        // Récupérer le résultat lié au paris 
        const result = await Result.findOne({ 
            where: { 
                RaceId: bet.RaceId,
                RiderId: bet.RiderId,
                BetTypeId: bet.BetTypeId,
                StageId: bet.StageId
            } 
        });

        let points = 0

        if (result !== null && result.result_rank !== 0) {
            // Classement général 
            if (bet.BetTypeId === 1 || bet.BetTypeId === 16) {
                if (bet.position === 1 && result.result_rank === 1) {
                    points = 100
                } else if (bet.position <= 3 && result.result_rank <= 3) {
                    points = 50
                } else if (bet.position <= 10 && result.result_rank <= 10) {
                    points = 20
                }
            } else if (bet.BetTypeId === 8) { // Classement étape
                if (bet.position === 1 && result.result_rank === 1) {
                    points = 10
                } else if (bet.position <= 3 && result.result_rank <= 3) {
                    points = 5
                }
            }
        }

        // On fait x2 si le coureur fait parti de l'équipe
        const userRider = await UserRiders.findOne({ 
            where: { 
                RiderId: bet.RiderId,
                UserId: bet.UserId,
                LeagueId: bet.LeagueId
            } 
        });

        if (userRider !== null) {
            points = points * 2
        }

        await bet.update({ point: points, computed: true });

    }
}

processResults().then(() => {
    console.log("Traitement des résultats terminé");
}).catch((error) => {
    console.error("Une erreur est survenue lors du traitement des ligues:", error);
});