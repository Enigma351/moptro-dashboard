import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { config } from '../config/config.js';
import { mockUsers, withFallback } from '../utils/mockProvider.js';
import AppError from '../utils/AppError.js';

class AuthService {
  async signup(name, email, password) {
    this.validatePassword(password);
    return await withFallback(
      async () => {
        const exists = await User.findOne({ email });
        if (exists) throw new AppError('User already exists', 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = this.generateToken(user.id || user._id);
        return { token, user: { id: user.id || user._id, name: user.name, email: user.email } };
      },
      async () => {
        if (mockUsers.find(u => u.email === email)) {
          throw new AppError('User already exists (Mock Mode)', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword, _id: Date.now().toString() };
        mockUsers.push(newUser);

        const token = this.generateToken(newUser._id);
        return { token, user: { id: newUser._id, name: newUser.name, email: newUser.email } };
      }
    );
  }

  async signin(email, password) {
    const user = await withFallback(
      async () => await User.findOne({ email }),
      async () => mockUsers.find(u => u.email === email)
    );

    if (!user) throw new AppError('Authentication failed: Invalid credentials provided.', 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError('Authentication failed: Invalid credentials provided.', 401);

    const token = this.generateToken(user.id || user._id);
    return { token, user: { id: user.id || user._id, name: user.name, email: user.email } };
  }

  async getProfile(userId) {
    const user = await withFallback(
      async () => await User.findById(userId).select('-password'),
      async () => {
        const found = mockUsers.find(u => u._id === userId);
        return found ? { id: found._id, name: found.name, email: found.email } : null;
      }
    );

    if (!user) throw new AppError('Resource not found: The requested user record does not exist.', 404);
    return user;
  }

  async updateProfile(userId, name) {
    const user = await withFallback(
      async () => await User.findByIdAndUpdate(userId, { name }, { new: true, runValidators: true }).select('-password'),
      async () => {
        const found = mockUsers.find(u => u._id === userId);
        if (found) found.name = name;
        return found ? { id: found._id, name: found.name, email: found.email } : null;
      }
    );

    if (!user) throw new AppError('Resource not found: The requested user record does not exist.', 404);
    return user;
  }

  generateToken(id) {
    return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN || '1d' });
  }

  /**
   * Generates secure cookie options for JWT transmission.
   */
  getCookieOptions() {
    return {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true, // Prevent XSS
      secure: true, // Mandated for SameSite: None
      sameSite: 'None', // Mandatory for cross-origin cookies (Vercel -> Render)
    };
  }

  /**
   * 🛡️ Password Complexity Validator
   */
  validatePassword(password) {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      throw new AppError(`Password must be at least ${minLength} characters long`, 400);
    }
    if (!hasNumber) {
      throw new AppError('Password must contain at least one number', 400);
    }
    if (!hasSpecialChar) {
      throw new AppError('Password must contain at least one special character', 400);
    }
  }

  /**
   * 🛡️ Password Update Logic
   */
  async updatePassword(userId, currentPassword, newPassword) {
    this.validatePassword(newPassword);

    const user = await withFallback(
      async () => await User.findById(userId),
      async () => mockUsers.find(u => u._id === userId)
    );

    if (!user) throw new AppError('User not found', 404);

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) throw new AppError('Current password incorrect', 401);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await withFallback(
      async () => await User.findByIdAndUpdate(userId, { password: hashedPassword }),
      async () => {
        const found = mockUsers.find(u => u._id === userId);
        if (found) found.password = hashedPassword;
      }
    );

    return { message: 'Password updated successfully' };
  }

  /**
   * 🛡️ Toggle Two-Factor Authentication
   */
  async toggleTwoFactor(userId, enabled) {
    const user = await withFallback(
      async () => await User.findByIdAndUpdate(userId, { twoFactorEnabled: enabled }, { new: true }).select('-password'),
      async () => {
        const found = mockUsers.find(u => u._id === userId);
        if (found) found.twoFactorEnabled = enabled;
        return found;
      }
    );

    if (!user) throw new AppError('User not found', 404);
    return user;
  }
}

export default new AuthService();
