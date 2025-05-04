const blogRouter = require('express').Router();

const blogFinder = require('../middleware/blogFinder');
const blogController = require('../controllers/blogController');
const tokenExtractor = require('../middleware/tokenExtractor');

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post('/', tokenExtractor, blogController.createBlog);
blogRouter.get('/:id', blogFinder, blogController.getBlogById);
blogRouter.put(
  '/:id',
  tokenExtractor,
  blogFinder,
  blogController.updateBlog
);
blogRouter.delete(
  '/:id',
  tokenExtractor,
  blogFinder,
  blogController.deleteBlog
);

module.exports = blogRouter;
