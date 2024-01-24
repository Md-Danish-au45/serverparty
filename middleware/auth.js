const jwt = require("jsonwebtoken");

const jwtSecret = 'danish';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Token is missing or invalid' });
  }

  try {
    const tokenWithoutBearer = token.split(' ')[1];

    // Verify the token and decode it
    const decoded = jwt.verify(tokenWithoutBearer, jwtSecret);
    
    req.decoded = decoded;

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = verifyToken;
