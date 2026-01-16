import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/apiClient';
export default function PlatformSettings() {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        apiFetch('/dashboard/settings')
            .then((res) => {
            setSettings(Array.isArray(res) ? res : []);
        })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);
    /* toggle */
    const toggleSetting = async (key) => {
        const current = settings.find((s) => s.key === key);
        if (!current)
            return;
        const nextEnabled = !current.enabled;
        setSettings((prev) => prev.map((s) => s.key === key ? { ...s, enabled: nextEnabled } : s));
        try {
            await apiFetch('/dashboard/settings', {
                method: 'PUT',
                body: JSON.stringify({
                    key,
                    enabled: nextEnabled,
                }),
            });
        }
        catch {
            // rollback 
            setSettings((prev) => prev.map((s) => s.key === key ? { ...s, enabled: current.enabled } : s));
        }
    };
    if (loading) {
        return (_jsx("div", { className: "absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center", style: {
                top: '680px',
                left: '35px',
                width: '360px',
                height: '330px',
                background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
            }, children: _jsx("p", { className: "text-white/60", children: "Loading settings\u2026" }) }));
    }
    if (error) {
        return (_jsx("div", { className: "absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center", style: {
                top: '680px',
                left: '35px',
                width: '360px',
                height: '330px',
                background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
            }, children: _jsx("p", { className: "text-red-400", children: "Failed to load settings" }) }));
    }
    return (_jsxs("div", { className: "absolute rounded-[20px] backdrop-blur p-6", style: {
            top: '680px',
            left: '35px',
            width: '360px',
            height: '330px',
            background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }, children: [_jsx("h3", { className: "text-lg font-bold", children: "Platform Settings" }), _jsx("div", { className: "space-y-4 mt-6", children: settings.map((item) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-xs text-white/70", children: item.label }), _jsx("button", { onClick: () => toggleSetting(item.key), className: `w-[36px] h-[18px] rounded-full relative transition-colors duration-200 ${item.enabled ? 'bg-blue-600' : 'bg-gray-500'}`, children: _jsx("div", { className: `absolute top-[2px] w-[14px] h-[14px] bg-white rounded-full transition-transform duration-200 ${item.enabled ? 'translate-x-[18px]' : 'translate-x-[2px]'}` }) })] }, item.key))) })] }));
}
