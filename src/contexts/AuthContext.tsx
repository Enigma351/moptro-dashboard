import React, { createContext, useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/services/apiClient';

export type User = {
  id: string;
  name: string;
  email: string;
} | null;

export interface AuthContextType {
  user: User;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      // apiFetch uses credentials: 'include' and handles 401s
      const data = await apiFetch('/auth/profile');
      setUser(data);
    } catch (err) {
      // apiFetch already cleans up on 401, just ensure local state is null
      console.error('Auth verification failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = async () => {
    // Note: The HTTP cookie was already set by the signin/signup API call.
    // We just need to synchronize the user state and a non-sensitive 'isLoggedIn' flag.
    localStorage.setItem('isLoggedIn', 'true');
    await fetchProfile();
  };

  const logout = async () => {
    try {
      // 🛡️ Perform global revocation via POST
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout revocation failed:', err);
    } finally {
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      window.location.href = '/signin';
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
