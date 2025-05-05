const blogRouter = require('express').Router();

const blogFinder = require('../middleware/blogFinder');
const blogController = require('../controllers/blogController');
const tokenExtractor = require('../middleware/tokenExtractor');
const { userFinderById } = require('../middleware/userFinder');
const blogOwnerChecker = require('../middleware/blogOwnerChecker');

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post(
  '/',
  tokenExtractor,
  userFinderById,
  blogController.createBlog
);
blogRouter.get('/:id', blogFinder, blogController.getBlogById);
blogRouter.put(
  '/:id',
  tokenExtractor,
  userFinderById,
  blogFinder,
  blogOwnerChecker,
  blogController.updateBlog
);
blogRouter.delete(
  '/:id',
  tokenExtractor,
  userFinderById,
  blogFinder,
  blogOwnerChecker,
  blogController.deleteBlog
);

module.exports = blogRouter;
