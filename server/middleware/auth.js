const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // get token from cookie
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'no token, authorization denied' });
    }
    
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // add user id to request
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'token is not valid' });
  }
};

module.exports = authMiddleware;