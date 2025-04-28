const express = require('express');
const { Todo } = require('../mongo');
const { setAsync, getAsync } = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

const increaseAddedTodo = async () => {
  try {
    let added_todos = await getAsync('added_todos');

    added_todos = parseInt(added_todos, 10) || 0;

    added_todos += 1;

    await setAsync('added_todos', added_todos);
    return added_todos;
  } catch (error) {
    console.error('Failed to update todo count:', error);
    res.status(500).json({ error: error.message });
    return;
  }
};

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  increaseAddedTodo();

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  try {
    const { _id } = req.todo;
    const { text, done = false } = req.body;
    req.todo.text = text;
    req.todo.done = done;

    if (!_id) {
      return res.status(400).json({ error: '_id is required' });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id },
      req.todo,
      {
        new: true,
        upsert: true,
        overwrite: true,
      }
    );

    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating Todo:', error);
    res.status(400).json({ error: 'Something went wrong' });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
