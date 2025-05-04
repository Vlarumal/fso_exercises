const {
  createUser,
  getAllUsers,
  updateUser,
  getUser,
} = require('../controllers/userController');
const isAdmin = require('../middleware/isAdmin');
const userFinder = require('../middleware/userFinder');

const userRouter = require('express').Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:username', userFinder, getUser);
userRouter.put('/:username', userFinder, isAdmin, updateUser);

module.exports = userRouter;
