const express = require('express');
const router = express.Router();

const { getAsync } = require('../redis');

/* GET statistics data. */
router.get('/', async (_req, res) => {
  const result = await getAsync('added_todos');
  const added_todos = JSON.parse(result);

  res.json({
    added_todos,
  });
});

module.exports = router;
