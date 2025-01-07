import axios from 'axios';

/**
 * Fonction pour récupérer les packs disponibles.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @returns {Promise<Object|boolean>} - Renvoie les données des packs
 */
const getAllPacks = async (ip_address) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/packs/all',
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour acheter un pack
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {string} type - Type du pack.
 * @param {string} price - Prix du pack.
 * @returns {Promise<Object|boolean>} - Renvoie les coureurs gagnés
 */
const buyPack = async (ip_address, user_id, type, price) => {
    try {
        
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/pack/buy',
            params: {user_id, type, price}
        });
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getAllPacks, buyPack };