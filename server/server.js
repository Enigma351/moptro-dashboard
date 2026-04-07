import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

import { config } from './config/config.js';
import { connectDB } from './config/database.js';
import { seedDatabase } from './seed/seed.js';
import { errorHandler } from './middleware/error.middleware.js';
import { globalLimiter, ipBlacklist, csrfCheck, checkRevokedToken } from './middleware/security.middleware.js';
import AppError from './utils/AppError.js';

/* Routes */
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import profileRoutes from './routes/profile.routes.js';
import healthRoutes from './routes/health.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * 🛡️ Enterprise Security & Monitoring Stack
 */

// 1. 🍪 CORS Configuration (Must be high priority)
app.use(cors({
  origin: config.ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-TOKEN']
}));

// 2. HTTP Security Headers (Helmet)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 3. Logging (Morgan)
app.use(morgan(config.NODE_ENV === 'development' ? 'dev' : 'combined'));

// 4. IP Blacklisting (Custom)
app.use(ipBlacklist);

// 5. Rate Limiting (Global)
app.use('/api', globalLimiter);

// 6. Data Sanitization (NoSQL Injection)
app.use(mongoSanitize());

// 7. Data Sanitization (XSS)
app.use(xss());

// 8. Prevent Parameter Pollution
app.use(hpp());

// 9. 🍪 Cookie Parsing
app.use(cookieParser());

// 10. 📥 Body Parser
app.use(express.json({ limit: '10kb' }));

// 11. CSRF Validation (Global for Mutation Methods)
app.use(csrfCheck);

// 12. JWT Revocation Check (Global)
app.use(checkRevokedToken);

// 13. 📂 Static Storage
app.use('/uploads', express.static(path.join(__dirname, 'public')));

/**
 * API Routes
 */
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/profile', profileRoutes);

// 404 Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/**
 * Global Error Handling (Must be last)
 */
app.use(errorHandler);

/**
 * Process Level Error Handling
 */
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

/**
 * Launcher
 */
const startServer = async () => {
  try {
    await connectDB();
    if (config.NODE_ENV === 'development') {
      await seedDatabase();
    }
    const server = app.listen(config.PORT, () => {
      console.log(`\n🚀 MOPTRO Server initialized on port ${config.PORT}`);
      console.log(`🏠 Environment: ${config.NODE_ENV}`);
      console.log(`📂 Static assets: ${path.join(__dirname, 'public')}\n`);
    });

    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! 💥 Shutting down...');
      console.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    console.error('SERVER INITIALIZATION FAILED:', err);
    process.exit(1);
  }
};

startServer();
