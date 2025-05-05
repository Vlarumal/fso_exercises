const { User, Blog } = require('../models');

const blogToInclude = {
  model: Blog,
  as: 'readings',
  attributes: {
    exclude: ['userId', 'createdAt', 'updatedAt'],
  },
  through: {
    attributes: [],
  },
};

/**
 * Middleware to find a user by username from route params.
 * Attaches the user instance to req.user if found.
 * Sends a 404 response if not found.
 */
const userFinder = async (req, res, next) => {
  try {
    const { username } = req.params;

    // if (!username && !id) {
    //   return res
    //     .status(400)
    //     .json({ error: 'Username or id parameter required' });
    // }

    let user;

    if (username) {
      user = await User.findOne({
        where: { username },
        attributes: ['name', 'username'],
        include: [blogToInclude],
      });
    }
    // else if (id) {
    //   user = await User.findByPk(id, {
    //     attributes: ['name', 'username'],
    //     include: [blogToInclude],
    //   });
    // }

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
