import AuthService from '../services/AuthService.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { sendSuccess } from '../utils/responseHandler.js';
import RevokedToken from '../models/RevokedToken.js';

/**
 * Handles User Sign-up
 */
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ status: 'fail', message: 'All fields are required' });
  }

  const { token, user } = await AuthService.signup(name, email, password);
  
  // 🍪 Set Secure Cookie
  res.cookie('jwt', token, AuthService.getCookieOptions());

  sendSuccess(res, 201, { token, user }, 'Signup successful');
});

/**
 * Handles User Sign-in
 */
export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
  }

  const { token, user } = await AuthService.signin(email, password);
  
  // 🍪 Set Secure Cookie
  res.cookie('jwt', token, AuthService.getCookieOptions());
  
  sendSuccess(res, 200, { token, user }, 'Login successful');
});

/**
 * Handles User Logout
 * revokes the current JWT globally.
 */
export const logout = asyncHandler(async (req, res) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    // 🛡️ Blacklist the token globally
    await RevokedToken.create({
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day cleanup
    });
  }

  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  sendSuccess(res, 200, null, 'Logged out successfully (Global Revocation Enabled)');
});

/**
 * Retrieves User Profile (Basic)
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await AuthService.getProfile(req.user.id);
  sendSuccess(res, 200, user, 'Profile retrieved');
});

/**
 * Updates User Profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ status: 'fail', message: 'Name is required' });
  }

  const updatedUser = await AuthService.updateProfile(req.user.id, name);
  sendSuccess(res, 200, updatedUser, 'Profile updated successfully');
});

/**
 * Updates User Password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ status: 'fail', message: 'Current and new passwords are required' });
  }

  const result = await AuthService.updatePassword(req.user.id, currentPassword, newPassword);
  sendSuccess(res, 200, result, 'Password updated successfully');
});

/**
 * Toggles 2FA Status
 */
export const toggle2FA = asyncHandler(async (req, res) => {
  const { enabled } = req.body;
  
  if (typeof enabled !== 'boolean') {
    return res.status(400).json({ status: 'fail', message: 'Enabled status (boolean) is required' });
  }

  const user = await AuthService.toggleTwoFactor(req.user.id, enabled);
  sendSuccess(res, 200, user, `Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`);
});
