import { apiFetch } from '@/utils/apiClient';

export const signIn = (data: {
  email: string;
  password: string;
}) =>
  apiFetch('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const signUp = (data: {
  name: string;
  email: string;
  password: string;
}) =>
  apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
