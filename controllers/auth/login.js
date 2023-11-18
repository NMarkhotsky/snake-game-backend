const { ctrlWrapper } = require('../../helpers');
const db = require('../../db');
const { getToken } = require('../../utils');

const login = async (req, res) => {
  const { id, name } = req.user;

  const { token } = await getToken(id);

  const { rows: updUser } = await db.query(
    `
  UPDATE users 
  SET token=$1
  WHERE name=$2
  RETURNING name, token, score`,
    [token, name]
  );

  const { name: dbName, token: dbToken, score } = updUser[0];

  res.status(200).json({
    user: {
      name: dbName,
      score,
    },
    token: dbToken,
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
