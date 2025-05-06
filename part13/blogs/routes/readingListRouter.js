const {
  createReadingListEntry,
  updateReadingListEntry,
} = require('../controllers/readingListController');
const { authMiddleware } = require('../middleware/authMiddleware');
const tokenExtractor = require('../middleware/tokenExtractor');
const { userFinderById } = require('../middleware/userFinder');

const readingListRouter = require('express').Router();

readingListRouter.post(
  '/',
  tokenExtractor,
  authMiddleware,
  userFinderById,
  createReadingListEntry
);

readingListRouter.put(
  '/:id',
  tokenExtractor,
  authMiddleware,
  updateReadingListEntry
);

module.exports = readingListRouter;
