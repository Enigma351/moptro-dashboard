import { apiFetch } from '@/utils/apiClient';
export const signIn = (data) => apiFetch('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(data),
});
export const signUp = (data) => apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
});
