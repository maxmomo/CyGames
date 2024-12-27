import axios from 'axios';

/**
 * Fonction pour créer des userRiders.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @param {string} type - Type de création.
 * @returns {Promise<Object|boolean>} - Renvoie les données des coureurs créés
 */
const createUserRiders = async (ip_address, user_id, type) => {

    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/userriders/create',
            params: { user_id, type }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour échanger des userRiders.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @param {string} type - Type de création.
 * @param {string} riders - Coureurs échangés.
 * @returns {Promise<Object|boolean>} - Renvoie les données des coureurs créés
 */
const exchangeUserRiders = async (ip_address, user_id, type, riders, level) => {

    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/userriders/exchange',
            params: { user_id, type, riders, level }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { createUserRiders, exchangeUserRiders };
