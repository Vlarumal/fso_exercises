const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');

  if (
    authorization &&
    authorization.toLowerCase().startsWith('bearer ')
  ) {
    const token = authorization.substring(7);
    try {
      req.decodedToken = jwt.verify(token, SECRET);
    } catch (error) {
      console.error('JWT verification error:', error.message);
      return res.status(401).json({ error: 'token invalid' });
    }

    req.token = token;
    
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  next();
};

module.exports = tokenExtractor;
