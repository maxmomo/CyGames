import axios from 'axios';

/**
 * Fonction pour récupérer les équipes.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} year - Année de l'équipe.
 * @returns {Promise<Object|boolean>} - Renvoie les données des équipes
 */
const getTeams = async (ip_address, year) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/teams/all',
            params: { year }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour une équipe à partir de son Id.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} id - Id de l'équipe.
 * @returns {Promise<Object|boolean>} - Renvoie les données des équipes
 */
const getTeam = async (ip_address, id) => {

    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/team',
            params: { id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les coureurs de l'équipe.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} team_id - id de l'équipe.
 * @returns {Promise<Object|boolean>} - Renvoie les données des coureurs
 */
const getRiders = async (ip_address, team_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/team/riders',
            params: { team_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer l'historique de l'équpe.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} related_team_id - related_team_id de l'équipe.
 * @param {integer} year - Année courante.
 * @param {integer} team_year - Année de l'équipe.
 * @returns {Promise<Object|boolean>} - Renvoie les données des équipe de l'historique
 */
const getHistory = async (ip_address, related_team_id, year, team_year) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/team/history',
            params: { related_team_id, year, team_year }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les statistiques des .
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} related_team_id - related_team_id de l'équipe.
 * @returns {Promise<Object|boolean>} - Renvoie les données des statistiques
 */
const getStatistics = async (ip_address, related_team_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/team/statistics',
            params: { related_team_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getTeams, getTeam, getRiders, getHistory, getStatistics };
