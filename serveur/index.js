const express = require('express');
const cors = require('cors');
const http = require('http');
const sequelize = require('./config/database');
const router = require('./routes/index');

const app = express();

// Importer les modèles
const User = require('./models/User');
const Grid = require('./models/Grid');
const CrossWord = require('./models/CrossWord');
const UsersGrids = require('./models/UsersGrids');
const UsersCrossWords = require('./models/UsersCrossWords');
const UsersGridsLines = require('./models/UsersGridsLines');
const Rider = require('./models/Rider');
const UserRiders = require('./models/UserRiders');

// Configurer les associations
const db = {};
db.UserRiders = UserRiders;
db.User = User;
db.CrossWord = CrossWord;
db.Grid = Grid;
db.Rider = Rider;
db.UsersGrids = UsersGrids;
db.UsersCrossWords = UsersCrossWords;
db.UsersGridsLines = UsersGridsLines;

console.group(db)

// Associer les modèles
//UserRiders.associate(db);
User.associate(db);
Grid.associate(db);
CrossWord.associate(db);
Rider.associate(db);
UsersGridsLines.associate(db);

// Hooks pour alimenter la table UsersGrids
User.addHook('afterCreate', async (user, options) => {
  const grids = await Grid.findAll();
  const usersGridsData = grids.map(grid => ({
    userId: user.id,
    gridId: grid.id,
    score: 0,
  }));

  await UsersGrids.bulkCreate(usersGridsData);
});

Grid.addHook('afterCreate', async (grid, options) => {
  const users = await User.findAll();
  const usersGridsData = users.map(user => ({
    userId: user.id,
    gridId: grid.id,
    score: 0,
  }));

  await UsersGrids.bulkCreate(usersGridsData);
});

// Hooks pour alimenter la table UsersCrossWords
User.addHook('afterCreate', async (user, options) => {
  const crossWords = await CrossWord.findAll();
  const usersCrossWordsData = crossWords.map(crossWord => ({
    userId: user.id,
    crossWordId: crossWord.id,
    score: 0,
  }));

  await UsersCrossWords.bulkCreate(usersCrossWordsData);
});

CrossWord.addHook('afterCreate', async (crossWord, options) => {
  const users = await User.findAll();
  const usersCrossWordsData = users.map(user => ({
    userId: user.id,
    crossWordId: crossWord.id,
    score: 0,
  }));

  await UsersGrids.bulkCreate(usersCrossWordsData);
});

// Synchronise les modèles avec la base de données
sequelize.sync({ alter: true })
  .then(() => {
    console.log('La synchronisation avec la base de données est terminée.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation avec la base de données :', error);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(router);

// Paramètres du serveur
const port = 3000;
const maxHeaderSize = 1000000;

// Création et démarrage du serveur avec une taille maximale d'en-tête personnalisée
const server = http.createServer({ maxHeaderSize }, app);
server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
