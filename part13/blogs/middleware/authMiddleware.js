const { User } = require('../models');
const Session = require('../models/session');

const authMiddleware = async (req, res, next) => {
  const session = await Session.findOne({
    where: { session_token: req.token },
  });

  if (!session) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
    return res.status(401).json({ error: 'Session expired' });
  }

  const user = await User.findByPk(session.userId);

  if (!user || user.disabled) {
    return res
      .status(403)
      .json({ error: 'User is disabled or logged out' });
  }
  req.user = user;
  next();
};

module.exports = { authMiddleware };
