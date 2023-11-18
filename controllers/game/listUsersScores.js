const { ctrlWrapper } = require('../../helpers');
const db = require('../../db');

const listUsersScores = async (req, res) => {
  const { rows: users } = await db.query(
    `SELECT name, score FROM users ORDER BY score DESC LIMIT 10`
  );

  res.status(200).json({ users });
};

module.exports = {
  listUsersScores: ctrlWrapper(listUsersScores),
};
