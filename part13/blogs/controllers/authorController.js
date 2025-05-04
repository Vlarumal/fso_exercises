const { Blog } = require('../models');
const { sequelize } = require('../utils/db');

const getAllAuthors = async (_req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('title')), 'articles'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      ],
      group: 'author',
      order: [['likes', 'DESC']],
    });
    return res.json(authors);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllAuthors;
