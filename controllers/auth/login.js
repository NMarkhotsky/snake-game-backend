const { ctrlWrapper } = require('../../helpers');
const db = require('../../db');
const { getToken } = require('../../utils');

const login = async (req, res) => {
  const { name, id } = req.user;

  const { token } = await getToken(id);

  const { rows: updUser } = await db.query(
    `
  UPDATE users 
  SET token=$1
  WHERE name=$2
  RETURNING name, token, score, count_game`,
    [token, name]
  );

  const { name: dbName, token: dbToken, score, count_game } = updUser[0];

  res.status(200).json({
    user: {
      name: dbName,
      score,
      count_game,
    },
    token: dbToken,
  });
};

module.exports = {
  login: ctrlWrapper(login),
};
