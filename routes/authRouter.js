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

router.post('/auth/logout', authValidation.authenticate, ctrlUsers.logout);

router.get('/current', authValidation.authenticate, ctrlUsers.getCurrent);

module.exports = router;
