const jwt = require('jsonwebtoken');

const { SECRET } = require('../utils/config');
const User = require('../models/user');
const Session = require('../models/session');

const loginIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  const passwordCorrect = password === 'secret';

  if (!(user && passwordCorrect)) {
    return res
      .status(401)
      .json({ error: 'Invalid username or password' });
  }

  if (user.disabled) {
    return res.status(403).json({
      error: 'Account disabled, please contact admin',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: '24h' });

  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await Session.create({
    userId: user.id,
    sessionToken: token,
    expiresAt: expirationDate,
  });

  return res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
};

module.exports = loginIn;
