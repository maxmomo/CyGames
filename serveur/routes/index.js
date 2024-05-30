const express = require('express');
const router = express.Router();

const {createUser} = require('../controllers/users/createUser');
const {connectUser} = require('../controllers/users/connectUser');
const {getTeams} = require('../controllers/teams/getTeams');
const {getRidersTeam} = require('../controllers/riders/getRidersTeam');
const {getHistoryTeam} = require('../controllers/history/getHistoryTeam');
const {getStatisticsTeam} = require('../controllers/statistic/getStatisticsTeam');
const {getStatisticsTeamRace} = require('../controllers/statistic/getStatisticsTeamRace');
const {createLeague} = require('../controllers/league/createLeague');
const {getLeaguesUser} = require('../controllers/user/getLeaguesUser');
const {joinLeague} = require('../controllers/league/joinLeague');
const {getUserRidersOffer} = require('../controllers/ridersOffers/getUserRidersOffers');
const {getUserRidersOfferMercato} = require('../controllers/ridersOffers/getUserRidersOffersMercato');
const {createUserRidersOffers} = require('../controllers/ridersOffers/createUserRidersOffers');
const {deleteUserRidersOffers} = require('../controllers/ridersOffers/deleteUserRidersOffers');
const {getRiders} = require('../controllers/riders/getRiders');
const {getNextRace} = require('../controllers/races/getNextRace');
const {getStagesRace} = require('../controllers/stages/getStagesRace');
const {getStartListRace} = require('../controllers/startlist/getStartlistRace');
const {getUsersLeague} = require('../controllers/user/getUsersLeague');
const {getUsersRace} = require('../controllers/user/getUsersRace');
const {getUsersStage} = require('../controllers/user/getUsersStage');
const {getBetsUserRace} = require('../controllers/bet/getBetsUserRace');
const {setBetsUserRace} = require('../controllers/bet/setBetsUserRace');
const {getUserRidersLeague} = require('../controllers/userRiders/getUserRidersLeague');
const {getPrediction} = require('../controllers/prediction/getPrediction');
const {getTotalUserLeague} = require('../controllers/league/getTotalUserLeague');
const {getHistoryRidersOffer} = require('../controllers/ridersOffers/getHistoryRidersOffer');
const {getBetsUserStage} = require('../controllers/bet/getBetsUserStage');
const {setBetsUserStage} = require('../controllers/bet/setBetsUserStage');
const {setAvatarUser} = require('../controllers/user/setAvatarUser');
const {getResultsRace} = require('../controllers/results/getResultsRace');
const {getResultsStage} = require('../controllers/results/getResultsStage');
const {getUserPoints} = require('../controllers/point/getUserPoints');
const {getTeam} = require('../controllers/teams/getTeam');
const {quitLeague} = require('../controllers/league/quitLeague');

router.get("/users/create", createUser)
router.get("/users/connect", connectUser)
router.get("/user/leagues", getLeaguesUser)
router.post("/user/avatar/set", setAvatarUser)

router.get("/riders/all", getRiders)

router.get("/team", getTeam)
router.get("/teams/all", getTeams)
router.get("/team/riders", getRidersTeam)
router.get("/team/history", getHistoryTeam)
router.get("/team/statistics", getStatisticsTeam)
router.get("/team/race/statistics", getStatisticsTeamRace)

router.get("/league/create", createLeague)
router.get("/league/join", joinLeague)
router.get("/league/quit", quitLeague)
router.get("/league/users", getUsersLeague)
router.get("/league/user/riders", getUserRidersLeague)
router.get("/league/user/total", getTotalUserLeague)

router.get("/ridersOffers/user", getUserRidersOffer)
router.get("/ridersOffersMercato/user", getUserRidersOfferMercato)
router.get("/ridersOffers/user/create", createUserRidersOffers)
router.get("/ridersOffers/user/delete", deleteUserRidersOffers)
router.get("/ridersOffers/history", getHistoryRidersOffer)

router.get("/race/next", getNextRace)
router.get("/race/stages", getStagesRace)
router.get("/race/startlist", getStartListRace)
router.get("/race/user/bets", getBetsUserRace)
router.get("/race/user/bets/set", setBetsUserRace)
router.get("/race/results", getResultsRace)
router.get("/race/users", getUsersRace)

router.get("/stage/prediction", getPrediction)
router.get("/stage/user/bets", getBetsUserStage)
router.get("/stage/user/bets/set", setBetsUserStage)
router.get("/stage/results", getResultsStage)
router.get("/stage/users", getUsersStage)

router.get("/point/user", getUserPoints)


module.exports = router