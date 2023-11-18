const express = require('express');
const { ctrlGame } = require('../controllers');
const { authValidation } = require('../middlewares');

const router = express.Router();

router.post('/addScore', authValidation.authenticate, ctrlGame.updateUserScore);

router.get('/scores', ctrlGame.listUsersScores);

module.exports = router;
