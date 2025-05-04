const { User, Blog } = require('../models');

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ['userId'] },
      },
    });

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, name } = req.body;

    if (!username || !name) {
      return res
        .status(400)
        .json({ error: 'Username and name are required' });
    }

    const isEmailCheck = /^[^\s@]+@[^\s@]+\.[^\s]+$/;
    if (!isEmailCheck.test(username)) {
      return res
        .status(400)
        .json({ error: 'Username must be a valid email address' });
    }

    const user = await User.create({ username, name });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res) => {
  return res.json(req.user);
};

const updateUser = async (req, res, next) => {
  try {
    const updatedData = {};
    const { name, username, disabled } = req.body;
    if (name !== undefined) updatedData.name = req.body.name;
    if (username !== undefined)
      updatedData.username = req.body.username;
    if (disabled !== undefined)
      updatedData.disabled = req.body.disabled;

    const updatedUser = await req.user.update(updatedData);
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
};
