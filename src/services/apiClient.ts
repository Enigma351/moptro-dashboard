import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Enterprise API Fetcher (Cookie-Only)
 * Standardizes request options and response unwrapping without localStorage tokens.
 * Security: Uses 'credentials: include' for HttpOnly JWT transmission.
 */
export const apiFetch = async (endpoint: string, options: any = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': 'fetch-sync', // Placeholder for CSRF handshake if needed
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // 🍪 Send secure cookies automatically
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('isLoggedIn');
        const p = window.location.pathname;
        if (p !== '/signin' && p !== '/signup') {
          window.location.href = '/signin';
        }
      }
      const errorData = await response.json().catch(() => ({}));
      const message = errorData.message || 'API request failed';
      
      const error = new Error(message) as Error & { status: number };
      error.status = response.status;
      throw error;
    }

    const result = await response.json();
    
    // 🍬 Enterprise unwrapping
    if (result.status === 'success' && result.data !== undefined) {
      return result.data;
    }
    
    return result;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

/**
 * Centralized Axios Instance (Cookie-Only)
 */
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🍪 Send secure cookies automatically
});

// Interceptor to unwrap enterprise response in Axios
apiClient.interceptors.response.use(
  (response) => {
    if (response.data?.status === 'success' && response.data?.data !== undefined) {
      return response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('isLoggedIn');
      const p = window.location.pathname;
      if (p !== '/signin' && p !== '/signup') {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
