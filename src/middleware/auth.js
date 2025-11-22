// src/middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Set it in your .env file.');
}

// Verify token and attach user (userId, role) to req.user
function authenticate(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or invalid' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET); // { userId, role, iat, exp }
    req.user = payload;
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Role-based authorization
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
}

// Ownership-based helper (for future, e.g. /users/:id)
function requireSelfOrAdmin(getTargetUserId) {
  return (req, res, next) => {
    const targetUserId = getTargetUserId(req);

    if (req.user.role === 'ADMIN') {
      return next();
    }

    if (req.user.userId !== targetUserId) {
      return res.status(403).json({ error: 'Forbidden: you do not own this resource' });
    }

    next();
  };
}

module.exports = {
  authenticate,
  requireRole,
  requireSelfOrAdmin,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
