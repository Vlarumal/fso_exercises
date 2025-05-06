const Session = require('../models/session');

const logout = async (req, res, next) => {
  try {
    const token = req.token;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const deleted = await Session.destroy({
      where: { session_token: token },
    });

    if (deleted) {
      res.status(200).json({ message: 'Logout successful' });
    } else {
      res
        .status(400)
        .json({ error: 'Invalid session or already logged out' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };
