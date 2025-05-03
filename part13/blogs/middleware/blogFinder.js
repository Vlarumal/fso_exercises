const { Blog } = require('../models');

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
