import DashboardService from '../services/DashboardService.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { sendSuccess } from '../utils/responseHandler.js';

/**
 * Combined Overview Stats
 */
export const overview = asyncHandler(async (req, res) => {
  const data = await DashboardService.getOverview();
  sendSuccess(res, 200, data, 'Overview stats retrieved');
});

/**
 * System Utilization Data
 */
export const utilization = asyncHandler(async (req, res) => {
  const data = await DashboardService.getUtilization();
  sendSuccess(res, 200, data, 'Utilization data retrieved');
});

/**
 * Active Vehicle Fleet
 */
export const products = asyncHandler(async (req, res) => {
  const data = await DashboardService.getProducts();
  sendSuccess(res, 200, data, 'Products retrieved successfully');
});

export const getProductById = asyncHandler(async (req, res) => {
  const data = await DashboardService.getProductById(req.params.id);
  sendSuccess(res, 200, data, 'Product details retrieved successfully');
});

export const getAuthors = asyncHandler(async (req, res) => {
  const data = await DashboardService.getAuthors();
  sendSuccess(res, 200, data, 'Authors retrieved successfully');
});

export const getProjects = asyncHandler(async (req, res) => {
  const data = await DashboardService.getProjects();
  sendSuccess(res, 200, data, 'Projects retrieved successfully');
});

export const placeOrder = asyncHandler(async (req, res) => {
  const data = await DashboardService.placeOrder(req.body, req.user.email);
  sendSuccess(res, 201, data, 'Fleet inclusion request recorded successfully');
});

export const getRecentOrders = asyncHandler(async (req, res) => {
  const data = await DashboardService.getRecentOrders();
  sendSuccess(res, 200, data, 'Recent orders retrieved');
});

/**
 * System Settings Fetch
 */
export const settings = asyncHandler(async (req, res) => {
  const data = await DashboardService.getSettings();
  sendSuccess(res, 200, data, 'Settings retrieved');
});

/**
 * Update System Setting State
 */
export const updateSettings = asyncHandler(async (req, res) => {
  const { key } = req.body;
  const data = await DashboardService.updateSetting(key);
  sendSuccess(res, 200, data, 'Setting updated');
});

export const billingInfo = asyncHandler(async (req, res) => {
  const data = await DashboardService.getBillingInfo();
  sendSuccess(res, 200, data, 'Billing info retrieved');
});

export const invoices = asyncHandler(async (req, res) => {
  const data = await DashboardService.getInvoices();
  sendSuccess(res, 200, data, 'Invoices retrieved');
});

export const updatePlan = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const data = await DashboardService.updatePlan(planId);
  sendSuccess(res, 200, data, 'Fleet subscription updated');
});

export const terminateLicense = asyncHandler(async (req, res) => {
  const data = await DashboardService.terminateSubscription();
  sendSuccess(res, 200, data, 'Fleet license deactivated');
});
export const updatePaymentMethod = asyncHandler(async (req, res) => {
  const { cardType, last4, expiry } = req.body;
  const data = await DashboardService.updatePaymentMethod({ cardType, last4, expiry });
  sendSuccess(res, 200, data, 'Payment method updated successfully');
});
