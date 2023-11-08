const express = require('express');
const { ctrlUser } = require('../controllers');
const router = express.Router();

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);

module.exports = router;
