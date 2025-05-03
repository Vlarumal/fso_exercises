const blogRouter = require('express').Router();

const blogFinder = require('../middleware/blogFinder');
const blogController = require('../controllers/blogController');

blogRouter.get('/', blogController.getAllBlogs);
blogRouter.post('/', blogController.createBlog);
blogRouter.get('/:id', blogFinder, blogController.getBlogById);
blogRouter.put('/:id', blogFinder, blogController.updateBlog);
blogRouter.delete('/:id', blogFinder, blogController.deleteBlog);

module.exports = blogRouter;
