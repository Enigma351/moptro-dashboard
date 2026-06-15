import rateLimit from 'express-rate-limit';
import RevokedToken from '../models/RevokedToken.js';
import { config } from '../config/config.js';

/**
 *  Global Rate Limiter
 * Protects against DoS and automated scraping.
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Increased for development dashboard stability
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Global Rate Limit Exceeded: Please wait 15 minutes before further interaction.',
  },
});

/**
 * Auth Rate Limiter
 * Stricter limit for sensitive authentication routes to prevent brute-force.
 */
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // Increased to prevent blocking during registration/login testing
  message: {
    status: 'fail',
    message: 'Security Notice: Multiple authentication attempts detected from this IP. Laboratory access restricted for 60 minutes.',
  },
});

/**
 * IP Blacklist Middleware
 * Rejects requests from blocked remote addresses.
 */
const blacklistedIPs = [
  // Example: '192.168.1.1'
];

export const ipBlacklist = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  if (blacklistedIPs.includes(clientIP)) {
    return res.status(403).json({
      status: 'fail',
      message: 'Access denied from this IP address.',
    });
  }
  next();
};

/**
 * Token Revocation Check
 * Checks if the JWT is in the revocation collection (e.g. after logout).
 */
export const checkRevokedToken = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    const isRevoked = await RevokedToken.findOne({ token });
    if (isRevoked) {
      return res.status(401).json({
        status: 'fail',
        message: 'This session has been terminated. Please log in again.',
      });
    }
  }
  next();
};

/**
 * CSRF Check Middleware (Lightweight)
 * Ensures requests originate from our own frontend.
 */
export const csrfCheck = (req, res, next) => {
  // GET, HEAD, OPTIONS are considered "safe" methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();

  const csrfHeader = req.headers['x-csrf-token'];
  const referer = req.headers.referer;

  // Verify the referer matches one of our allowed origins
  if (referer) {
    const isAllowed = config.ALLOWED_ORIGINS.some(origin => referer.startsWith(origin));
    if (!isAllowed) {
      return res.status(403).json({
        status: 'fail',
        message: 'CSRF Validation Failed: Untrusted Origin',
      });
    }
  }

  next();
};
