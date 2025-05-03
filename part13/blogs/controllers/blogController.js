const blogFinder = require('../middleware/blogFinder');
const { Blog } = require('../models');

exports.getAllBlogs = async (_req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    return res.json(blogs);
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, author, url, likes = 0 } = req.body;
    const blog = await Blog.create({ title, author, url, likes });
    return res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

exports.getBlogById = (req, res) => {
  return res.json(req.blog);
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { likes } = req.body;
    req.blog = await req.blog.update({ likes });
    return res.status(200).json(req.blog);
  } catch (error) {
    next(error);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await req.blog.destroy();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
