import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  overview,
  utilization,
  products,
  settings,
  updateSettings,
} from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/overview', auth, overview);
router.get('/utilization', auth, utilization);
router.get('/products', auth, products);
router.get('/settings', auth, settings);
router.put('/settings', auth, updateSettings);

export default router;
