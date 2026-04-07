import { isDbConnected } from '../config/database.js';

/* Global Mock Store */
export const mockUsers = [];

export const mockSettings = [
  { key: 'email_follow', label: 'Email notifications on followers', enabled: true },
  { key: 'email_answer', label: 'Notify on post interactions', enabled: false },
  { key: 'newsletter', label: 'Subscribe to fleet updates', enabled: true },
];

export const mockProducts = [
  { id: 1, name: 'WASP', description: 'High performance EV', image: '/uploads/products/WASP.jpg' },
  { id: 2, name: 'SNAIL', description: 'Urban electric vehicle', image: '/uploads/products/SNAIL 1.png' },
  { id: 3, name: 'BOLT', description: 'Fast charging EV', image: '/uploads/products/B 1.png' },
];

/**
 * Executes a fallback if the database is disconnected.
 * @param {Function} liveOperation Code to run if MongoDB is online.
 * @param {Function} mockOperation Code to run if MongoDB is offline.
 */
export const withFallback = async (liveOperation, mockOperation) => {
  if (!isDbConnected()) {
    return await mockOperation();
  }
  return await liveOperation();
};
