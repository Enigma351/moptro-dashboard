import ProfileService from '../services/ProfileService.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { sendSuccess } from '../utils/responseHandler.js';

/**
 * Retrieves Detailed User Profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const data = await ProfileService.getProfile(req.user.id);
  sendSuccess(res, 200, data, 'User profile retrieved');
});

/**
 * Updates User Profile Information
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const data = await ProfileService.updateProfile(req.user.id, req.body);
  sendSuccess(res, 200, data, 'User profile updated');
});
