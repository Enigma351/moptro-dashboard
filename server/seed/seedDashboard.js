import mongoose from 'mongoose';
import dotenv from 'dotenv';

import DashboardOverview from '../models/DashboardOverview.js';
import Utilization from '../models/Utilization.js';
import Setting from '../models/Setting.js';
import Product from '../models/Product.js';
import Author from '../models/Author.js';
import Project from '../models/Project.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

await DashboardOverview.deleteMany();
await Utilization.deleteMany();
await Setting.deleteMany();
await Product.deleteMany();
await Author.deleteMany();
await Project.deleteMany();


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
    { label: 'Energy Budget', value: '$32,984' },
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
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80\u0026w=100\u0026auto=format\u0026fit=crop',
    role: 'Manager',
    organization: 'Organization',
    status: 'Online',
    employedDate: '23/04/18',
  },
  {
    name: 'Alexa Lando',
    email: 'alexa@moptro.com',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80\u0026w=100\u0026auto=format\u0026fit=crop',
    role: 'Programmer',
    organization: 'Developer',
    status: 'Offline',
    employedDate: '11/01/19',
  },
  {
    name: 'Laurent Michael',
    email: 'laurent@moptro.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80\u0026w=100\u0026auto=format\u0026fit=crop',
    role: 'Executive',
    organization: 'Projects',
    status: 'Online',
    employedDate: '19/09/17',
  },
  {
    name: 'Fionna Grace',
    email: 'fionna@moptro.com',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80\u0026w=100\u0026auto=format\u0026fit=crop',
    role: 'Designer',
    organization: 'UI/UX',
    status: 'Online',
    employedDate: '04/10/21',
  },
]);

await Project.insertMany([
  {
    name: 'MOPTrO Dashboard',
    logo: 'https://img.icons8.com/color/48/adobe-xd.png',
    budget: '$14,000',
    status: 'Working',
    completion: 60,
  },
  {
    name: 'Neural Link API',
    logo: 'https://img.icons8.com/color/48/nodejs.png',
    budget: '$3,000',
    status: 'Done',
    completion: 100,
  },
  {
    name: 'Fleet Management System',
    logo: 'https://img.icons8.com/color/48/react-native.png',
    budget: '$20,500',
    status: 'Canceled',
    completion: 30,
  },
  {
    name: 'Secure Auth Protocol',
    logo: 'https://img.icons8.com/color/48/mongodb.png',
    budget: '$5,000',
    status: 'Working',
    completion: 80,
  },
]);

console.log('✅ Dashboard data seeded');
process.exit();
