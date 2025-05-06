const { logout } = require('../controllers/logoutController');
const tokenExtractor = require('../middleware/tokenExtractor');

const logoutRouter = require('express').Router();

logoutRouter.delete('/', tokenExtractor, logout);

module.exports = logoutRouter;
