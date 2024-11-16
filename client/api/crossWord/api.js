import axios from 'axios';

/**
 * Fonction pour récupérer les mots croisés de niveau.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des mots croisés de niveau
 */
const getAllCrossWords = async (ip_address, user_id) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/crossWords/all',
            params: {user_id}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllCrossWords };