const { User } = require('../models');

/**
 * Middleware to find a user by username from route params.
 * Attaches the user instance to req.user if found.
 * Sends a 404 response if not found.
 */
const userFinder = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to find a user by id from decoded token (e.g. after JWT verification).
 * Attaches the user instance to req.user if found.
 * Sends a 401 response if user is invalid or not found.
 */
const userFinderById = async (req, res, next) => {
  try {
    const userId = req.decodedToken?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ error: 'Authentication required' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userFinder,
  userFinderById,
};
