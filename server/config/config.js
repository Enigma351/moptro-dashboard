import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];

// Validate mandatory env vars for production-readiness
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ CRITICAL ERROR: Missing mandatory environment variable: ${varName}`);
    process.exit(1);
  }
});

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  ALLOWED_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'https://moptro-dashboard-three.vercel.app',
  ],
};
