import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

/**
 * Enterprise Authentication Middleware
 * Supports Header (Bearer) and Cookie (jwt) token extraction
 */
export default function authMiddleware(req, res, next) {
  let token;

  // 1) Extract from Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // 2) Extract from Cookie
  else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access.'
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    // Grant access to protected route
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token or session expired. Please sign in again.'
    });
  }
}
