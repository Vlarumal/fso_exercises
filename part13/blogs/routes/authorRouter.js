const authorRouter = require('express').Router();

const getAllAuthors = require('../controllers/authorController');

authorRouter.get('/', getAllAuthors);

module.exports = authorRouter;
