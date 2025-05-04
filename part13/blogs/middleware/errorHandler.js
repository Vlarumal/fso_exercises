const errorHandler = (error, _req, res, _next) => {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    const emailError = error.errors.find(
      (e) => e.validatorKey === 'isEmail' && e.path === 'username'
    );
    if (emailError) {
      return res.status(400).json({
        error: ['Validation isEmail on username failed'],
      });
    }

    return res.status(400).json({
      error: error.errors.map((e) => e.message),
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: ['Username must be unique'],
    });
  }

  if (error.name === 'NotFoundError') {
    return res.status(404).json({ error: [error.message] });
  }

  res.status(500).json({ error: ['Internal Server Error'] });
};

module.exports = errorHandler;
