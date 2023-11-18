const { ctrlWrapper } = require('../../helpers');
const db = require('../../db');

const updateUserScore = async (req, res) => {
  const { score } = req.body;
  const { id } = req.user;

  const { rows: updUserScore } = await db.query(
    `
    UPDATE users
    SET score = $1
    WHERE id = $2
    RETURNING name, score`,
    [score, id]
  );

  const { name: dbName, score: dbScore } = updUserScore[0];

  res.status(200).json({
    user: {
      name: dbName,
      score: dbScore,
    },
  });
};

module.exports = {
  updateUserScore: ctrlWrapper(updateUserScore),
};
