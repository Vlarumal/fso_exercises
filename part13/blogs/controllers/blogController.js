const { Op } = require('sequelize');
const { Blog, User } = require('../models');

exports.getAllBlogs = async (req, res, next) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${req.query.search}%` } },
      { author: { [Op.iLike]: `%${req.query.search}%` } },
    ];
  }

  try {
    const blogs = await Blog.findAll({
      order: [['likes', 'DESC']],
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name'],
      },
      where,
    });
    return res.json(blogs);
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, author, url, likes = 0, year } = req.body;

    if (!title || !url) {
      return res
        .status(400)
        .json({ error: 'title and url are required' });
    }

    const currentYear = new Date().getFullYear();

    if (!year || year < 1991 || year > currentYear) {
      return res.status(400).json({
        error: `Year must be between 1991 and current year ${currentYear}`,
      });
    }

    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Authentication required' });
    }

    const blog = await Blog.create({
      title,
      author,
      url,
      likes,
      year,
      userId: user.id,
    });

    const createdBlog = await Blog.findByPk(blog.id, {
      attributes: { exclude: ['userId'] },
      include: { model: User, attributes: ['name'] },
    });

    return res.status(201).json(createdBlog);
  } catch (error) {
    next(error);
  }
};

exports.getBlogById = (req, res) => {
  return res.json(req.blog);
};

exports.updateBlog = async (req, res, next) => {
  try {
    if (req.body.likes === undefined) {
      return res
        .status(400)
        .json({ error: "'likes' field is required" });
    }

    const { likes } = req.body;
    const updatedBlog = await req.blog.update({ likes });
    return res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    await req.blog.destroy();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
