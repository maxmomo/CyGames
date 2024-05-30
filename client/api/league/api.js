import axios from 'axios';

/**
 * Fonction pour créer une ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} name - Nom de la ligue.
 * @param {string} password - Mot de passe de la ligue.
 * @param {integer} user_id - ID de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la ligue ou false si la nom de ligue existe déjà
 */
const createLeague = async (ip_address, name, password, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/create',
            params: { name, password, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour rejoindre une ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} name - Nom de la ligue.
 * @param {string} password - Mot de passe de la ligue.
 * @param {integer} user_id - ID de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de la ligue ou 0 si identifiants incorrects ou 1 si déjà dans la ligue
 */
const joinLeague = async (ip_address, name, password, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/join',
            params: { name, password, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour rejoindre une ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} id - ID de la ligue.
 * @param {integer} user_id - ID de l'utilisateur.
 * @returns {string} - Renvoie OK
 */
const quitLeague = async (ip_address, league_id, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/quit',
            params: { league_id, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les utilisateurs de la ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} league_id - id de la ligue.
 * @param {string} user_id - id de l'utilisateur connecté.
 * @returns {Promise<Object|boolean>} - Renvoie les utilisateurs de la ligue
 */
const getUsersLeague = async (ip_address, league_id, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/users',
            params: { league_id, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les coureurs de l'utilisateur de la ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} league_id - id de la ligue.
 * @param {string} user_id - id de l'utilisateur connecté.
 * @returns {Promise<Object|boolean>} - Renvoie les coureurs de l'utilisateur de la ligue
 */
const getRidersUserLeague = async (ip_address, league_id, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/user/riders',
            params: { league_id, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer le total
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} league_id - id de la ligue.
 * @param {string} user_id - id de l'utilisateur connecté.
 * @returns {Promise<Object|boolean>} - Renvoie le total
 */
const getTotalUserLeague = async (ip_address, league_id, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/league/user/total',
            params: { league_id, user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { createLeague, joinLeague, quitLeague, getUsersLeague, getRidersUserLeague, getTotalUserLeague };