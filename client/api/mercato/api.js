import axios from 'axios';

/**
 * Fonction pour récupérer les offres de l'utilisateur pour la ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @param {integer} league_id - id de la ligue.
 * @returns {Promise<Object|boolean>} - Renvoie les données des offres de l'utilisateur
 */
const getRidersOffer = async (ip_address, user_id, league_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/ridersOffers/user',
            params: { user_id, league_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer le mercato pour l'utilisateur (coureurs sans offres).
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @param {integer} league_id - id de la ligue.
 * @param {integer} year - saison.
 * @returns {Promise<Object|boolean>} - Renvoie les données du mercato restant de l'utilisateur
 */
const getRidersOfferMercato = async (ip_address, user_id, league_id, year) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/ridersOffersMercato/user',
            params: { user_id, league_id, year }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour créer une offre
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @param {integer} league_id - id de la ligue.
 * @param {integer} offer - offre émise.
 * @param {integer} rider_id - id du coureur.
 * @returns {boolean} - Retourne true
 */
const createOffer = async (ip_address, user_id, league_id, offer, rider_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/ridersOffers/user/create',
            params: { user_id, league_id, offer, rider_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour supprimer une offre
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @param {integer} league_id - id de la ligue.
 * @param {integer} rider_id - id du coureur.
 * @returns {boolean} - Retourne true
 */
const deleteOffer = async (ip_address, user_id, league_id, rider_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/ridersOffers/user/delete',
            params: { user_id, league_id, rider_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fonction pour récupérer les offres de l'utilisateur pour la ligue.
 *
 * @param {string} ip_address - Adresse IP du serveur.
 * @param {integer} user_id - id de l'utilisateur.
 * @param {integer} league_id - id de la ligue.
 * @returns {Promise<Object|boolean>} - Renvoie les données des offres de l'utilisateur
 */
const getRidersOfferHistory = async (ip_address, league_id) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'http://' + ip_address + ':3000/ridersOffers/history',
            params: { league_id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { getRidersOffer, getRidersOfferMercato, createOffer, deleteOffer, getRidersOfferHistory };