const { v4: uuidv4 } = require('uuid');
const db = require('../../db');
const { ctrlWrapper } = require('../../helpers');
const { createHashPassword, getToken } = require('../../utils');

const register = async (req, res) => {
  const { name, password } = req.body;

  const id = uuidv4();

  const hashPassword = await createHashPassword(password);

  const { token: verificationToken } = await getToken(id);

  const { rows: newUser } = await db.query(
    `
  INSERT INTO users (id, name, password, token) 
  values ($1, $2, $3, $4) 
  RETURNING id, name, password, token`,
    [id, name, hashPassword, verificationToken]
  );

  const { name: dbName, token } = newUser[0];

  res.status(201).json({
    user: {
      name: dbName,
    },
    token,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
