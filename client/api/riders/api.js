import axios from 'axios';

/**
 * Fonction pour récupérer tous les coureurs
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des grilles de niveau
 */
const getAllRiders = async (ip_address) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/riders/all',
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer tous les coureurs d'un utilisateur par catégorie
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - ID de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les coureurs par catégorie
 */
const getUserRidersCategory = async (ip_address, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/riders/category/user',
            params: {user_id}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer tous les coureurs d'un utilisateur par équipe
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - ID de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les coureurs par catégorie
 */
const getUserRidersTeam = async (ip_address, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/riders/team/user',
            params: {user_id}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les coureurs à échanger selon le type
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - ID de l'utilisateur.
 * @param {string} type - Type d'échange.
 * @returns {Promise<Object|boolean>} - Renvoie les coureurs
 */
const getExchangeRiders = async (ip_address, user_id, type) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/riders/exchange',
            params: {user_id, type}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllRiders, getUserRidersCategory, getUserRidersTeam, getExchangeRiders };