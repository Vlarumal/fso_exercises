const loginIn = require('../controllers/loginController');

const loginRouter = require('express').Router();

loginRouter.post('/', loginIn);

module.exports = loginRouter;
