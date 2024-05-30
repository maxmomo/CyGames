import axios from 'axios';

/**
 * Fonction pour récupérer la prochaine course ou étape
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la course ou étape (ou les 2)
 */
const getNextRaces = async (ip_address) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/next'
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les étapes de la course.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @returns {Promise<Object|boolean>} - Renvoie les données des étapes
 */
const getStagesRace = async (ip_address, race_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/stages',
            params: { race_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer la startlist de la course (dans un contexte de ligue / utilisateur).
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @param {integer} user_id - id de l'utilisateur.
 * @param {integer} league_id - id de la ligue.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la startlist
 */
const getStartListRace = async (ip_address, race_id, user_id, league_id, year) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/startlist',
            params: { race_id, user_id, league_id, year }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les paris de l'utilisateur pour la course dans la ligue (classement général)
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @param {integer} user_id - id de l'utilisateur'.
 * @param {integer} league_id - id de la ligue.
 * @returns {Promise<Object|boolean>} - Renvoie les données des paris
 */
const getBetsUserRace = async (ip_address, race_id, user_id, league_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/user/bets',
            params: { race_id, user_id, league_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour créer un paris de l'utilisateur pour la course dans la ligue (classement général)
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @param {integer} user_id - id de l'utilisateur'.
 * @param {integer} league_id - id de la ligue.
 * @param {integer} position - position du paris.
 * @param {integer} rider_id - id du coureur.
 * @param {integer} bet_type_id - id du type de paris.
 * @returns {Promise<Object|boolean>} - Renvoie le paris créé ou modifié
 */
const setBetsUserRace = async (ip_address, race_id, user_id, league_id, position, rider_id, bet_type_id) => {

    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/user/bets/set',
            params: { race_id, user_id, league_id, position, rider_id, bet_type_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les résultats de la course
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @param {integer} user_id - id de l'utilisateur'.
 * @param {integer} league_id - id de la ligue.
 * @returns {Promise<Object|boolean>} - Renvoie les données des paris
 */
const getResultsRace = async (ip_address, race_id, user_id, league_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/results',
            params: { race_id, user_id, league_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer le classement des utilisateurs de la course
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} league_id - id de la ligue.
 * @param {integer} race_id - id de la course.
 * @returns {Promise<Object|boolean>} - Renvoie les données des utilisateurs
 */
const getUsersRace = async (ip_address, league_id, race_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/race/users',
            params: { race_id, league_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getNextRaces, getStagesRace, getStartListRace, getBetsUserRace, setBetsUserRace, getResultsRace, getUsersRace };