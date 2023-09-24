const express = require('express');
const router = express.Router();
const {TeamUpdate, getAllTeamUpdates,deleteTeamUpdate}= require('../controllers/TeamController')


router.post('/teamUpdates', TeamUpdate);


router.get('/teamUpdates', getAllTeamUpdates);
router.delete('/teamUpdates/:updateId', deleteTeamUpdate);

module.exports = router;
