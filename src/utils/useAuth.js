import { useEffect, useState } from 'react';
import { apiFetch } from './apiClient';
export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        apiFetch('/profile/me')
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);
    return { user, loading };
}
