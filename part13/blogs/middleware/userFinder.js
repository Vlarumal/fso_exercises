const { User } = require('../models');

/**
 * Middleware to find a user by username from route params.
 * Attaches the user instance to req.user if found.
 * Sends a 404 response if not found.
 */
const userFinder = async (req, res, next) => {
  try {
    const { username } = req.params;
    user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userFinder;
