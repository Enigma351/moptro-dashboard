import DashboardOverview from '../models/DashboardOverview.js';
import Utilization from '../models/Utilization.js';
import Product from '../models/Product.js';
import Setting from '../models/Setting.js';
import Author from '../models/Author.js';
import Project from '../models/Project.js';
import Order from '../models/Order.js';
import Invoice from '../models/Invoice.js';
import Subscription from '../models/Subscription.js';
import AppError from '../utils/AppError.js';

class DashboardService {
  async getOverview() {
    const data = await DashboardOverview.findOne().sort({ createdAt: -1 });
    if (!data) throw new AppError('Overview data not found', 404);
    return data;
  }

  async getUtilization() {
    const data = await Utilization.findOne().sort({ createdAt: -1 });
    if (!data) throw new AppError('Utilization data not found', 404);
    return data;
  }

  async getProducts() {
    const data = await Product.find().sort({ createdAt: 1 });
    return data;
  }

  async getProductById(id) {
    // If id is ObjectId, use findById, else use findOne with specific field if 'id' is a custom field.
    // In our seed, we don't set a custom 'id' field, so 'id' from params is likely the MongoDB _id.
    const data = await Product.findById(id);
    if (!data) throw new AppError('Product not found', 404);
    return data;
  }

  async getSettings() {
    const data = await Setting.find().sort({ createdAt: 1 });
    return data;
  }

  async getAuthors() {
    const data = await Author.find().sort({ createdAt: 1 });
    return data;
  }

  async getProjects() {
    const data = await Project.find().sort({ createdAt: 1 });
    return data;
  }

  async updateSetting(key) {
    const setting = await Setting.findOne({ key });
    if (!setting) {
      throw new AppError('Invalid setting key', 400);
    }

    setting.enabled = !setting.enabled;
    await setting.save();
    
    // Return all settings so UI can do a full refresh
    return await Setting.find().sort({ createdAt: 1 });
  }

  async placeOrder(orderData, userEmail) {
    const { productId, color, battery, autopilot, wheels, interior, softwarePackage, price } = orderData;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) throw new AppError('Product not found', 404);

    const order = await Order.create({
      productId,
      productName: product.name,
      color,
      battery,
      autopilot,
      wheels,
      interior,
      softwarePackage,
      price,
      userEmail
    });

    return order;
  }

  async getRecentOrders() {
    const data = await Order.find()
      .populate('productId')
      .sort({ createdAt: -1 })
      .limit(5);
    return data;
  }

  async getBillingInfo() {
    let sub = await Subscription.findOne();
    if (!sub) {
      sub = await Subscription.create({
        planName: 'Enterprise Fleet Capacity',
        price: '₹40,000',
        nextPayment: 'April 01, 2024',
        paymentMethod: { cardType: 'VISA', last4: '4242', expiry: '12/26' }
      });
    }
    return sub;
  }

  async getInvoices() {
    let invoices = await Invoice.find().sort({ createdAt: -1 });
    if (invoices.length === 0) {
      // Seed initial invoices
      invoices = await Invoice.insertMany([
        { invoiceId: 'INV-2024-001', date: 'Mar 01, 2024', amount: '$499.00', status: 'Paid', planName: 'Enterprise' },
        { invoiceId: 'INV-2024-002', date: 'Feb 01, 2024', amount: '$499.00', status: 'Paid', planName: 'Enterprise' },
        { invoiceId: 'INV-2024-003', date: 'Jan 01, 2024', amount: '$499.00', status: 'Paid', planName: 'Enterprise' }
      ]);
    }
    return invoices;
  }

  async updatePlan(planId) {
    const plans = {
      'pro': { name: 'Pro Fleet Hub', price: '₹24,000' },
      'enterprise': { name: 'Enterprise Fleet Capacity', price: '₹40,000' },
      'elite': { name: 'Elite Quantum Fleet', price: '₹80,000' }
    };

    const selectedPlan = plans[planId.toLowerCase()];
    if (!selectedPlan) throw new AppError('Invalid plan selected', 400);

    let sub = await Subscription.findOne();
    if (!sub) {
      sub = new Subscription();
    }

    sub.planName = selectedPlan.name;
    sub.price = selectedPlan.price;
    await sub.save();
    return sub;
  }

  async terminateSubscription() {
    let sub = await Subscription.findOne();
    if (!sub) throw new AppError('No active fleet subscription found', 404);

    sub.planName = 'DEACTIVATED';
    sub.price = '₹0';
    await sub.save();

    // Log the termination in invoice history
    await Invoice.create({
      invoiceId: 'TERM-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2024' }),
      amount: '₹0.00',
      status: 'Paid',
      planName: 'Termination'
    });

    return sub;
  }

  async updatePaymentMethod(paymentData) {
    const { cardType, last4, expiry } = paymentData;
    
    let sub = await Subscription.findOne();
    if (!sub) {
      sub = new Subscription();
    }

    sub.paymentMethod = {
      cardType: cardType.toUpperCase(),
      last4,
      expiry
    };

    await sub.save();
    return sub;
  }
}

export default new DashboardService();

