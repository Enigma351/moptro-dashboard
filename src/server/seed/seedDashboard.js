import mongoose from 'mongoose';
import dotenv from 'dotenv';

import DashboardOverview from '../models/DashboardOverview.js';
import Utilization from '../models/Utilization.js';
import Setting from '../models/Setting.js';
import Product from '../models/Product.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

await DashboardOverview.deleteMany();
await Utilization.deleteMany();
await Setting.deleteMany();
await Product.deleteMany();


await DashboardOverview.create({
  battery: 68,
  chargingStatus: 'Charging',
  chargingTime: '0h 58 min',
  batteryHealth: 76,
  efficiency: 20,
  consumption: 163,
  distance: 1342,
});

await Utilization.create({
  change: 23,
  chart: [40, 55, 30, 65, 90, 75, 85, 45],
  stats: [
    { label: 'Wallet', value: '$32,984' },
    { label: 'Average Range', value: '35 Km' },
    { label: 'Consumables Cost', value: '$2,400' },
    { label: 'Maintenance Cost', value: '$5,000' },
  ],
});


await Setting.insertMany([
  {
    key: 'email_follow',
    label: 'Email me when someone follows me',
    enabled: true,
  },
  {
    key: 'email_answer',
    label: 'Email me when someone answers',
    enabled: false,
  },
  {
    key: 'newsletter',
    label: 'Subscribe to newsletter',
    enabled: true,
  },
]);

await Product.insertMany([
  {
    name: 'WASP',
    description: 'High performance EV',
    image: '/uploads/products/B 1@2x.png',
  },
  {
    name: 'SNAIL',
    description: 'Urban electric vehicle',
    image: '/uploads/products/SNAIL 1.png',
  },
  {
    name: 'BOLT',
    description: 'Fast charging EV',
    image: '/uploads/products/B 1.png',
  },
]);

console.log('✅ Dashboard data seeded');
process.exit();
