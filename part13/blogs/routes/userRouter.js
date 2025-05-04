const {
  createUser,
  getAllUsers,
  updateUser,
  getUser,
} = require('../controllers/userController');
const userFinder = require('../middleware/userFinder');

const userRouter = require('express').Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:username', userFinder, getUser);
userRouter.put('/:username', userFinder, updateUser);

module.exports = userRouter;
