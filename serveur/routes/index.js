const express = require('express');
const router = express.Router();

const {createUser} = require('../controllers/users/createUser');
const {connectUser} = require('../controllers/users/connectUser');
const {setAvatarUser} = require('../controllers/user/setAvatarUser');
const {getGrids} = require('../controllers/grids/getGrids');
const { getAllRiders } = require('../controllers/riders/getAllRiders');

router.get("/users/create", createUser)
router.get("/users/connect", connectUser)
router.post("/user/avatar/set", setAvatarUser)

router.get("/grids/all", getGrids)

router.get("/riders/all", getAllRiders)

module.exports = router