import { apiFetch } from '@/utils/apiClient';
export const getOverview = () => apiFetch('/dashboard/overview');
export const getUtilization = () => apiFetch('/dashboard/utilization');
export const getProducts = () => apiFetch('/dashboard/products');
export const getSettings = () => apiFetch('/dashboard/settings');
