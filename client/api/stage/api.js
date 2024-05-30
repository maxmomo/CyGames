import axios from 'axios';

/**
 * Fonction pour récupérer les prédiction des 3 premiers coureurs de l'étape
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} stage_id - id de l'etape.
 * @param {integer} race_id - id de la course.
 * @returns {Promise<Object|boolean>} - Renvoie les données des trois coureurs
 */
const getPrediction = async (ip_address, stage_id, race_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/stage/prediction',
            params: { stage_id, race_id }
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
 * @param {integer} stage_id - id de l'étape.
 * @returns {Promise<Object|boolean>} - Renvoie les données des paris
 */
const getBetsUserStage = async (ip_address, race_id, user_id, league_id, stage_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/stage/user/bets',
            params: { race_id, user_id, league_id, stage_id }
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
const setBetsUserStage = async (ip_address, race_id, user_id, league_id, position, rider_id, bet_type_id, stage_id) => {

    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/stage/user/bets/set',
            params: { race_id, user_id, league_id, position, rider_id, bet_type_id, stage_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les résultats de l'étape'
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} race_id - id de la course.
 * @param {integer} user_id - id de l'utilisateur'.
 * @param {integer} league_id - id de la ligue.
 * @param {integer} stage_id - id de l'étape.
 * @returns {Promise<Object|boolean>} - Renvoie les données des paris
 */
const getResultsStage = async (ip_address, race_id, user_id, league_id,stage_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/stage/results',
            params: { race_id, user_id, league_id, stage_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer le classement des utilisateurs de l'étape'
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} league_id - id de la ligue.
 * @param {integer} race_id - id de la course.
 * @param {integer} stage_id - id de l'étape.
 * @returns {Promise<Object|boolean>} - Renvoie les données des utilisateurs
 */
const getUsersStage = async (ip_address, league_id, race_id, stage_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/stage/users',
            params: { race_id, league_id, stage_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getPrediction, getBetsUserStage, setBetsUserStage, getResultsStage, getUsersStage };