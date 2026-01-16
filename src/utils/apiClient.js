const API = import.meta.env.VITE_API_URL;
export async function apiFetch(path, options = {}) {
    const token = localStorage.getItem('token') ||
        sessionStorage.getItem('token');
    const res = await fetch(`${API}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'API Error');
    }
    return res.json();
}
