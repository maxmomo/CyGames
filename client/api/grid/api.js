import axios from 'axios';

/**
 * Fonction pour récupérer les grilles de niveau.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des grilles de niveau
 */
const getAllGrids = async (ip_address) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/grids/all',
            params: {}
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllGrids };