const express = require('express');
const { ctrlUsers } = require('../controllers');
const { authValidation } = require('../middlewares');

const router = express.Router();

router.post(
  '/auth/register',
  authValidation.registerValidation,
  ctrlUsers.register
);

router.post('/auth/login', authValidation.loginValidation, ctrlUsers.login);

module.exports = router;
