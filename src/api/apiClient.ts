const API_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json', 
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Invalid JSON response from server');
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
