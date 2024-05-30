const express = require('express');
const cors = require('cors');
const http = require('http'); // Importez le module http

const app = express();
const sequelize = require('./config/database');
const router = require('./routes/index');

// Synchronise les modèles avec la base de données
sequelize.sync({ alter: true })
  .then(() => {
    console.log('La synchronisation avec la base de données est terminée.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation avec la base de données :', error);
  });

// Middlewareseq
app.use(cors());
app.use(express.json());
app.use(router);

// Paramètres du serveur
const port = 3000;
const maxHeaderSize = 1000000; // Taille maximale des en-têtes (ajustez selon vos besoins)

// Création et démarrage du serveur avec une taille maximale d'en-tête personnalisée
const server = http.createServer({ maxHeaderSize }, app);
server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
