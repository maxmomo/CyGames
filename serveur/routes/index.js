const express = require('express');
const router = express.Router();

const {createUser} = require('../controllers/users/createUser');
const {connectUser} = require('../controllers/users/connectUser');
const {setAvatarUser} = require('../controllers/user/setAvatarUser');
const {getAllGrids} = require('../controllers/grid/getAllGrids');
const {getAllRiders} = require('../controllers/riders/getAllRiders');
const {setUserGridLines} = require('../controllers/gridLines/setUserGridLines');
const {getUserGridLines} = require('../controllers/gridLines/getUserGridLines');
const {checkUserGridLines} = require('../controllers/gridLines/checkUserGridLines');
const {retryGrid} = require('../controllers/grid/retryGrid');
const {getUserRiders} = require('../controllers/riders/getUserRiders');
const {cretaUserRiders} = require('../controllers/userRiders/createUserRiders');

router.get("/users/create", createUser)
router.get("/users/connect", connectUser)
router.post("/user/avatar/set", setAvatarUser)

router.get("/riders/all", getAllRiders)
router.get("/riders/user", getUserRiders)

router.get("/grids/all", getAllGrids)
router.get('/grids/retry', retryGrid)

router.get("/lines/grid/user/set", setUserGridLines)
router.get("/lines/grid/user/get", getUserGridLines)
router.get("/lines/grid/user/check", checkUserGridLines)

router.get("/userriders/create", cretaUserRiders)

module.exports = router