import { apiFetch } from '@/utils/apiClient';
export const getProfile = () => apiFetch('/profile');
export const updateProfile = (data) => apiFetch('/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
});
