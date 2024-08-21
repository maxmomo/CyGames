import axios from 'axios';

/**
 * Fonction pour sauvegarder la réponse d'une grille d'un utilisateur
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @param {string} user_grid_id - Id de la grille.
 * @param {Array} grid_datas - données de la grille
 * @returns {Promise<Object|boolean>} - Renvoie OK
 */
const getUserGridLines = async (ip_address, user_id, grid_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/lines/grid/user/get',
            params: {user_id, grid_id}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les ligne d'une grille d'un utilisateur
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @param {string} grid_id - Id de la grille.
 * @param {Array} grid_datas - données de la grille
 * @returns {Promise<Object|boolean>} - Renvoie OK
 */
const setUserGridLines = async (ip_address, user_id, grid_id, grid_datas) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/lines/grid/user/set',
            params: {user_id, grid_id, grid_datas}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour checker les ligne d'une grille d'un utilisateur
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} user_id - Id de l'utilisateur.
 * @param {string} grid_id - Id de la grille.
 * @param {Array} grid_datas - données de la grille
 * @returns {Promise<Object|boolean>} - Renvoie les résultats de l'utilisateur et la correction
 */
const checkUserGridLines = async (ip_address, user_id, grid_id, grid_datas) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/lines/grid/user/check',
            params: {user_id, grid_id, grid_datas}
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { setUserGridLines, getUserGridLines, checkUserGridLines };