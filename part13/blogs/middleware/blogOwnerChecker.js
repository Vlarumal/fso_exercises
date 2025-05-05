const blogOwnerChecker = (req, res, next) => {
  if (!req.decodedToken || req.decodedToken.id !== req.blog.userId) {
    return res
      .status(403)
      .json({ error: 'Forbidden: You do not own this blog' });
  }
  next();
};

module.exports = blogOwnerChecker;
