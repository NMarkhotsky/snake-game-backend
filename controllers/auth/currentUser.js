const { ctrlWrapper } = require('../../helpers');

const getCurrent = async (req, res) => {
  const { name, token, score } = req.user;

  res.status(200).json({
    user: {
      name,
      score,
    },
    token,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
