const { loginDataValidation } = require('../../services/auth');
const { httpError } = require('../../helpers');
const db = require('../../db');
const bcrypt = require('bcrypt');

const loginValidation = async (req, res, next) => {
  try {
    const { value, error } = loginDataValidation(req.body);

    if (error) {
      throw httpError(400, error.message);
    }

    const { rows: user } = await db.query(
      `
          SELECT id, name, password
          FROM users 
          WHERE name=$1`,
      [value.name]
    );

    if (user.length === 0) {
      throw httpError(401, 'Login or password is wrong');
    }

    const { password: dbPassword } = user[0];

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      dbPassword
    );

    if (!comparedPassword) {
      throw httpError(401, 'Login or password is wrong');
    }

    req.user = user[0];

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginValidation,
};
