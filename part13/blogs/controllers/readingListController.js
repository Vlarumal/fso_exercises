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

module.exports = addReadingListEntry;
