import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  if (!config.MONGO_URI) {
    console.error('CRITICAL: MONGO_URI is missing in environment.');
    return;
  }

  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('MongoDB connected successfully (Live Mode)');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.warn('Backend operating in Mock Fallback Mode.');
  }
};

export const isDbConnected = () => mongoose.connection.readyState === 1;
