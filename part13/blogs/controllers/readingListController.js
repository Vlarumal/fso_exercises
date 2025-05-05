const { ReadingList } = require('../models');

const addReadingListEntry = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const blogId = req.body.blogId;

    if (!userId || !blogId) {
      return res.status(400).json({
        error:
          'User must be authenticated and blogId must be provided',
      });
    }

    const existingEntry = await ReadingList.findOne({
      where: { userId, blogId },
    });

    if (existingEntry) {
      return res.status(409).json({
        error: 'Blog is already in the reading list',
      });
    }

    const addedReading = await ReadingList.create({ userId, blogId });
    const updatedReadingList = await ReadingList.findByPk(
      addedReading.id
    );

    return res.status(201).json(updatedReadingList);
  } catch (error) {
    next(error);
  }
};

const updateReadingListEntry = async (req, res, next) => {
  try {
    const readingListEntryToUpdate = await ReadingList.findByPk(
      req.params.id
    );

    if (!readingListEntryToUpdate) {
      return res
        .status(404)
        .json({ error: 'Reading list entry not found' });
    }

    const { read } = req.body;

    if (typeof read !== 'boolean') {
      return res.status(400).json({
        error: "read state must be a boolean",
      });
    }

    const updatedReadingListEntry =
      await readingListEntryToUpdate.update({ read });
    return res.status(200).json({
      read: updatedReadingListEntry.read,
      id: updatedReadingListEntry.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReadingListEntry,
  updateReadingListEntry,
};
