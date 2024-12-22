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
const {awardGrid} = require('../controllers/grid/awardGrid');
const {getUserRiders} = require('../controllers/riders/getUserRiders');
const {createUserRiders} = require('../controllers/userRiders/createUserRiders');
const {getAllCrossWords} = require('../controllers/crossWord/getAllCrossWords');

router.get("/users/create", createUser)
router.get("/users/connect", connectUser)
router.post("/user/avatar/set", setAvatarUser)

router.get("/riders/all", getAllRiders)
router.get("/riders/user", getUserRiders)

router.get("/grids/all", getAllGrids)
router.get('/grids/retry', retryGrid)
router.get('/grids/award', awardGrid)

router.get("/crossWords/all", getAllCrossWords)

router.get("/lines/grid/user/set", setUserGridLines)
router.get("/lines/grid/user/get", getUserGridLines)
router.get("/lines/grid/user/check", checkUserGridLines)

router.get("/userriders/create", createUserRiders)

module.exports = router