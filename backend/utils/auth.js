// This file is Middleware to protect routes

// Bring in jsonwebtoken and your secret (.env is used for this)
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';

// This is Express middleware - it runs before a protected route
function verifyToken(req, res, next) {
  // Look for a token in the request header like: Authorization: Bearer TOKEN 
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
  if (!token) return res.status(403).json({ message: 'No token provided' });

  // If the token is valid, store the userId and continue; otherwise block access
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// export this so routes can use it
module.exports = { verifyToken };
