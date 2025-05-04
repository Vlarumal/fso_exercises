const { Blog } = require('../models');

/**
 * Middleware to find a blog by id from route params.
 * Attaches the blog instance to req.blog if found.
 * Sends a 404 response if not found.
 */
const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = blogFinder;
