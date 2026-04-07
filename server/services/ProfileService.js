import User from '../models/User.js';
import { mockUsers, withFallback } from '../utils/mockProvider.js';
import AppError from '../utils/AppError.js';

class ProfileService {
  async getProfile(userId) {
    const user = await withFallback(
      async () => await User.findById(userId).select('-password'),
      async () => {
        const found = mockUsers.find(u => u._id === userId);
        return found ? { id: found._id, name: found.name, email: found.email } : null;
      }
    );

    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  async updateProfile(userId, updateData) {
    return await withFallback(
      async () => {
        const user = await User.findByIdAndUpdate(
          userId,
          updateData,
          { new: true, runValidators: true }
        ).select('-password');

        if (!user) throw new AppError('User not found', 404);
        return user;
      },
      async () => {
        const index = mockUsers.findIndex(u => u._id === userId);
        if (index === -1) throw new AppError('Mock user not found', 404);

        mockUsers[index] = { ...mockUsers[index], ...updateData };
        const { password, ...safeUser } = mockUsers[index];
        return { id: safeUser._id, ...safeUser };
      }
    );
  }
}

export default new ProfileService();
