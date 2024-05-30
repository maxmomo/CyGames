const League = require("../models/League")
const UserRidersOffer = require("../models/UserRidersOffer")
const UserRiders = require("../models/UserRiders")
const { Op } = require('sequelize');

// L'objectif de ce script est de calculer les équipes des ligues à la fin du mercato

// Fonctionnement :

// * Parcours de toutes les ligues 
// **** Parcours de toutes les offres de la ligue 
// **** Si coureur de l'offre pas encore traité :
// ******** Parcours de toutes les offres pour ce coureur 
// *********** La plus gorsse offre permet de créer l'enregistrement d'équipe
// *********** On ajoute le coureur dans les coureurs traités

async function processLeagues() {
    const leagues = await League.findAll();
    
    for (const league of leagues) {

        // Récupérer toutes les offres pour la ligue actuelle
        const offers = await UserRidersOffer.findAll({ 
            where: { 
                LeagueId: league.id,
                state: 0
            } 
        });

        let processedRunners = new Set(); // Pour garder une trace des coureurs déjà traités

        for (const offer of offers) {
            if (!processedRunners.has(offer.RiderId)) {
                // Trouver l'offre la plus élevée
                const highestOfferRecord = await UserRidersOffer.findOne({
                    where: {
                        LeagueId: league.id,
                        RiderId: offer.RiderId,
                        state: 0
                    },
                    order: [
                        ['offer', 'DESC'], // D'abord trier par offre
                        ['createdAt', 'ASC'] // Ensuite par date de création
                    ],
                    limit: 1
                });

                await UserRiders.create({ 
                    RiderId: offer.RiderId,
                    UserId: highestOfferRecord.UserId,
                    LeagueId: league.id,
                });

                // Marquer le coureur comme traité
                processedRunners.add(offer.RiderId);

                // Mettre à 1 l'offre qui a été validée
                await highestOfferRecord.update({ state: 1 })

                // On cherche toutes les autres offres et on les met à 2
                const offersToUpdate = await UserRidersOffer.findAll({
                    where: {
                        LeagueId: league.id,
                        RiderId: offer.RiderId,
                        UserId: { [Op.ne]: highestOfferRecord.UserId }
                    }
                });
                
                for (const offerToUpdate of offersToUpdate) {
                    await offerToUpdate.update({ state: 2 });
                }     
                
                // On supprime les
            }
        }
    }
}

processLeagues().then(() => {
    console.log("Traitement des ligues terminé");
}).catch((error) => {
    console.error("Une erreur est survenue lors du traitement des ligues:", error);
});