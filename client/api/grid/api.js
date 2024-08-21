import axios from 'axios';

/**
 * Fonction pour récupérer les grilles de niveau.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des grilles de niveau
 */
const getAllGrids = async (ip_address, user_id) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/grids/all',
            params: {user_id}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction qui permet de recommencer une grille.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @param {string} grid_id - Id de la grille.
 * @returns {Promise<Object|boolean>} - Renvoie OK
 */
const retryGrids = async (ip_address, user_id, grid_id) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/grids/retry',
            params: {user_id, grid_id}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllGrids, retryGrids };