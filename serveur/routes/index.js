const express = require('express');
const router = express.Router();

const {createUser} = require('../controllers/users/createUser');
const {connectUser} = require('../controllers/users/connectUser');
const {setAvatarUser} = require('../controllers/user/setAvatarUser');
const {getAllGrids} = require('../controllers/grid/getAllGrids');
const {getAllRiders} = require('../controllers/riders/getAllRiders');
const {setUserGridLines} = require('../controllers/gridLines/setUserGridLines');

router.get("/users/create", createUser)
router.get("/users/connect", connectUser)
router.post("/user/avatar/set", setAvatarUser)

router.get("/grids/all", getAllGrids)

router.get("/riders/all", getAllRiders)

router.get("/lines/grid/user", setUserGridLines)

module.exports = router