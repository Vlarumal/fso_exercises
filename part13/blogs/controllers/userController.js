const { User, Blog } = require('../models');

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['name', 'username'],
      include: [
        {
          model: Blog,
          attributes: { exclude: ['userId'] },
        },
      ],
    });

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    let { username, name } = req.body;

    if (!username || !name) {
      return res
        .status(400)
        .json({ error: 'Username and name are required' });
    }

    username = username.toLowerCase();

    const isEmailCheck = /^[^\s@]+@[^\s@]+\.[^\s]+$/;
    if (!isEmailCheck.test(username)) {
      return res
        .status(400)
        .json({ error: 'Username must be a valid email address' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'Username already exists' });
    }

    const user = await User.create({ username, name });
    return res.status(201).json({ username, name });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res) => {
  return res.json(req.user);
};

const getUserById = async (req, res, next) => {
  const where = {};

  if (req.query.read) {
    const read = req.query.read;
    where.read = read;
  }

  try {
    const blogToInclude = {
      model: Blog,
      as: 'readings',
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt'],
      },
      through: {
        attributes: ['read', 'id'],
        as: 'readinglists',
        where,
      },
    };

    const user = await User.findByPk(req.params.id, {
      include: [blogToInclude],
    });

    if (user) {
      return res.json({
        username: user.username,
        name: user.name,
        readings: user.readings,
      });
    } else {
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }

  // return res.json(req.user);
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
  getUserById,
  updateUser,
};
