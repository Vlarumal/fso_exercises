const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  }
  if (error.name === 'NotFoundError') {
    return res.status(404).json({ error: error.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = errorHandler;
