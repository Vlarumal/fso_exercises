const {
  addReadingListEntry,
  updateReadingListEntry,
} = require('../controllers/readingListController');
const tokenExtractor = require('../middleware/tokenExtractor');
const { userFinderById } = require('../middleware/userFinder');

const readingListRouter = require('express').Router();

readingListRouter.post(
  '/',
  tokenExtractor,
  userFinderById,
  addReadingListEntry
);

readingListRouter.put('/:id', tokenExtractor, updateReadingListEntry);

module.exports = readingListRouter;
