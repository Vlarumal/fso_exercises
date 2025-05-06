const blogRouter = require('express').Router();

const blogFinder = require('../middleware/blogFinder');
const blogController = require('../controllers/blogController');
const tokenExtractor = require('../middleware/tokenExtractor');
const { userFinderById } = require('../middleware/userFinder');
const blogOwnerChecker = require('../middleware/blogOwnerChecker');
const { authMiddleware } = require('../middleware/authMiddleware');

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post(
  '/',
  tokenExtractor,
  authMiddleware,
  userFinderById,
  blogController.createBlog
);
blogRouter.get('/:id', blogFinder, blogController.getBlogById);
blogRouter.put(
  '/:id',
  tokenExtractor,
  authMiddleware,
  userFinderById,
  blogFinder,
  blogOwnerChecker,
  blogController.updateBlog
);
blogRouter.delete(
  '/:id',
  tokenExtractor,
  authMiddleware,
  userFinderById,
  blogFinder,
  blogOwnerChecker,
  blogController.deleteBlog
);

module.exports = blogRouter;
