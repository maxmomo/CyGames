import axios from 'axios';

/**
 * Fonction pour récupérer les statistiques sur les grandes courses
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} related_team_id - related_team_id de l'équipe.
 * @param {integer} pcs_id - pcs_id de la course.
 * @returns {Promise<Object|boolean>} - Renvoie les données de statistiques de la course
 */
const getStatisticsRace = async (ip_address, related_team_id, pcs_race_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/team/race/statistics',
            params: { related_team_id, pcs_race_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { getStatisticsRace };