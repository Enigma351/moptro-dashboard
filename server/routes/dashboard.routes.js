import express from 'express';
import auth from '../middleware/auth.middleware.js';
import {
  overview,
  utilization,
  products,
  getProductById,
  getAuthors,
  getProjects,
  placeOrder,
  getRecentOrders,
  settings,
  updateSettings,
  billingInfo,
  invoices,
  updatePlan,
  terminateLicense,
  updatePaymentMethod,
} from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/overview', auth, overview);
router.get('/utilization', auth, utilization);
router.get('/products', auth, products);
router.get('/products/:id', auth, getProductById);
router.get('/authors', auth, getAuthors);
router.get('/projects', auth, getProjects);
router.get('/orders', auth, getRecentOrders);
router.post('/orders', auth, placeOrder);
router.get('/settings', auth, settings);
router.post('/settings', auth, updateSettings);
router.get('/billing', auth, billingInfo);
router.get('/invoices', auth, invoices);
router.post('/billing/plan', auth, updatePlan);
router.post('/billing/terminate', auth, terminateLicense);
router.post('/billing/payment', auth, updatePaymentMethod);

export default router;
