const { registerValidation } = require('./registerValidation');
const { loginValidation } = require('./loginValidation');
const { authenticate } = require('./authenticate');

module.exports = {
  registerValidation,
  loginValidation,
  authenticate,
};
