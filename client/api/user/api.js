import axios from 'axios';

/**
 * Fonction pour se connecter en tant qu'utilisateur.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} email - Email de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de l'utilisateur ou false en cas d'échec
 */
const loginUser = async (ip_address, email, password) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/users/connect',
            params: { email, password }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour créer un utilisateur.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} email - Email de l'utilisateur.
 * @param {string} userName - Nom d'utilisateur de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données de l'utilisateur ou false en cas d'échec
 */
const createUser = async (ip_address, email, userName, password) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/users/create',
            params: { email, userName, password }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les ligues de l'utilisateur.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des ligues de l'utilisateur
 */
const getLeaguesUser = async (ip_address, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/user/leagues',
            params: { user_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour changer l'avatar d'un utilisateur.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie rien
 */
const setAvatarUser = async (ip_address, user_id, avatar) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://' + ip_address + ':3000/user/avatar/set',
            params: { user_id, avatar }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les points d'un utilisateur.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @param {integer} league_id - id de la ligue.
 * @returns {Promise<Object|boolean>} - Renvoie les données des points de l'utilisateur
 */
const getUserPoints = async (ip_address, user_id, league_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/point/user',
            params: { user_id, league_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { loginUser, createUser, getLeaguesUser, setAvatarUser, getUserPoints };
