import axios from 'axios';

/**
 * Fonction pour récupérer sauvegarder la réponse d'une grille d'un utilisateur
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
            url: 'http://' + ip_address + ':3000/lines/grid/user',
            params: {user_id, grid_id, grid_datas}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { setUserGridLines };