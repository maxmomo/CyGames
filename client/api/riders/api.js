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
 * Fonction pour récupérer tous les coureurs d'un utilisateur
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - ID de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des grilles de niveau
 */
const getUserRiders = async (ip_address, user_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/riders/user',
            params: {user_id}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllRiders, getUserRiders };