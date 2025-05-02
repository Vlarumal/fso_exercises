const blogRouter = require('express').Router();

const { Blog } = require('../models');

blogRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogRouter.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    return res.json(req.blog);
  }
  return res.status(404).end();
});

blogRouter.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    return res.status(204).end();
  }
  return res.status(404).end();
});

blogRouter.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    return res.json(req.blog);
  }
  return res.status(404).end();
});

module.exports = blogRouter;
