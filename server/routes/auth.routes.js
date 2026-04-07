import express from 'express';
import { signup, signin, getProfile, updateProfile, logout, changePassword, toggle2FA } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/security.middleware.js';

const router = express.Router();

router.post('/signup', authLimiter, signup);
router.post('/signin', authLimiter, signin);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/password', authMiddleware, changePassword);
router.put('/2fa', authMiddleware, toggle2FA);
router.post('/logout', logout); // Logout should ideally be a POST for security

export default router;
