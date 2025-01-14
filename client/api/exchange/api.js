import axios from 'axios';

/**
 * Fonction pour récupérer les échanges disponibles.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des échanges
 */
const getAllExchanges = async (ip_address) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/exchanges/all',
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllExchanges };