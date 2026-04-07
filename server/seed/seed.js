import DashboardOverview from '../models/DashboardOverview.js';
import Utilization from '../models/Utilization.js';
import Product from '../models/Product.js';
import Setting from '../models/Setting.js';
import Author from '../models/Author.js';
import Project from '../models/Project.js';
import Invoice from '../models/Invoice.js';
import Subscription from '../models/Subscription.js';

export const seedDatabase = async () => {
  try {
    // 🧹 Wipe collections for a clean seed in development
    await Promise.all([
      DashboardOverview.deleteMany(),
      Utilization.deleteMany(),
      Product.deleteMany(),
      Author.deleteMany(),
      Project.deleteMany(),
      Setting.deleteMany(),
      Invoice.deleteMany(),
      Subscription.deleteMany()
    ]);

    console.log('🌱 Initiating Global Fleet Command Center Sync...');

    await DashboardOverview.create({
      battery: 68,
      chargingStatus: 'Nominal',
      chargingTime: '0h 58 min',
      batteryHealth: 76,
      efficiency: 20,
      consumption: 163,
      distance: 1342,
    });

    await Utilization.create({
      efficiency: 23,
      consumption: 120,
      distance: 2450,
      lastTrip: 'Strategic Hub Alpha',
      stats: [
        { label: 'Energy Budget', value: '₹32,984' },
        { label: 'Average Range', value: '35 Km' },
        { label: 'Consumables Cost', value: '₹2,400' },
        { label: 'Maintenance Cost', value: '₹5,000' },
      ],
    });

    await Product.insertMany([
      {
        name: 'WASP',
        description: 'Precision-engineered high performance electric vehicle for the modern enthusiast.',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'SNAIL',
        description: 'Compact urban electric vehicle designed for seamless navigation through smart cities.',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop',
      },
      {
        name: 'BOLT',
        description: 'Advanced fast-charging EV featuring the latest in neural autopilot and battery longevity.',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
      },
    ]);

    await Author.insertMany([
      {
        name: 'Elizabath Emiline',
        email: 'elizabath@moptro.com',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        role: 'Fleet Manager',
        organization: 'Command HQ',
        status: 'Online',
        employedDate: '23/04/18',
      },
      {
        name: 'Alexa Lando',
        email: 'alexa@moptro.com',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
        role: 'Systems Engineer',
        organization: 'Technical Division',
        status: 'Offline',
        employedDate: '11/01/19',
      },
      {
        name: 'Laurent Michael',
        email: 'laurent@moptro.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        role: 'Logistics Executive',
        organization: 'Operations',
        status: 'Online',
        employedDate: '19/09/17',
      },
      {
        name: 'Fionna Grace',
        email: 'fionna@moptro.com',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop',
        role: 'Fleet Dispatcher',
        organization: 'Logistics',
        status: 'Online',
        employedDate: '12/06/21',
      },
    ]);

    await Project.insertMany([
      {
        name: 'MOPTrO Fleet Launch',
        logo: 'https://img.icons8.com/color/48/adobe-xd.png',
        budget: '₹14,000',
        status: 'Working',
        completion: 60,
      },
      {
        name: 'Neural Autopilot V2',
        logo: 'https://img.icons8.com/color/48/nodejs.png',
        budget: '₹3,000',
        status: 'Done',
        completion: 100,
      },
      {
        name: 'HyperCharge Network Expansion',
        logo: 'https://img.icons8.com/color/48/react-native.png',
        budget: '₹20,500',
        status: 'Canceled',
        completion: 30,
      },
      {
        name: 'Secure Telemetry Protocol',
        logo: 'https://img.icons8.com/color/48/mongodb.png',
        budget: '₹5,000',
        status: 'Working',
        completion: 80,
      },
    ]);

    await Setting.insertMany([
      { key: 'autopilot', label: 'Neural Autopilot Link', enabled: true },
      { key: 'sentry', label: 'Perimeter Sentry Mode', enabled: true },
      { key: 'climate', label: 'Intelligent Cabin Conditioning', enabled: false },
      { key: 'updates', label: 'Over-the-Air Fleet Updates', enabled: true },
    ]);

    await Subscription.create({
      planName: 'Enterprise Fleet Capacity',
      price: '₹40,000',
      nextPayment: 'April 01, 2024',
      paymentMethod: { cardType: 'VISA', last4: '4242', expiry: '12/26' }
    });

    await Invoice.insertMany([
      { invoiceId: 'INV-2024-001', date: 'Mar 01, 2024', amount: '₹40,000.00', status: 'Paid', planName: 'Enterprise' },
      { invoiceId: 'INV-2024-002', date: 'Feb 01, 2024', amount: '₹40,000.00', status: 'Paid', planName: 'Enterprise' },
      { invoiceId: 'INV-2024-003', date: 'Jan 01, 2024', amount: '₹40,000.00', status: 'Paid', planName: 'Enterprise' }
    ]);

    console.log('✅ Synchronization Complete');

  } catch (error) {
    console.error('❌ SYNCHRONIZATION FAILED:', error);
  }
};
