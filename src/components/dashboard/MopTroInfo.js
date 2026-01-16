import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ChargeIcon from '@/assets/charge.svg';
import CarIcon from '@/assets/Group.svg';
import ChargingIcon from '@/assets/Charging.svg';
import { apiFetch } from '@/utils/apiClient';
function Stat({ title, value, icon, }) {
    return (_jsxs("div", { className: "bg-white/5 rounded-[15px] px-4 py-6 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-white/60", children: title }), _jsx("p", { className: "text-lg font-bold", children: value })] }), icon && (_jsx("div", { className: "w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center", children: _jsx("img", { src: icon, alt: "" }) }))] }));
}
export default function MopTroInfo({ user, }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        apiFetch('/dashboard/overview')
            .then(setData)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);
    /* loading */
    if (loading) {
        return (_jsx("div", { className: "absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center", style: {
                top: '270px',
                left: '35px',
                width: '730px',
                height: '377px',
                background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
            }, children: _jsx("p", { className: "text-white/60 animate-pulse", children: "Loading MOPTrO data\u2026" }) }));
    }
    /* error */
    if (error || !data) {
        return (_jsx("div", { className: "absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center", style: {
                top: '270px',
                left: '35px',
                width: '730px',
                height: '377px',
                background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
            }, children: _jsx("p", { className: "text-red-400", children: "Failed to load MOPTrO information" }) }));
    }
    return (_jsxs("div", { className: "absolute rounded-[20px] backdrop-blur p-6", style: {
            top: '270px',
            left: '35px',
            width: '730px',
            height: '377px',
            background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }, children: [_jsx("h3", { className: "text-lg font-bold", children: "MOPTrO Information" }), _jsxs("p", { className: "text-sm text-white/60 mt-1", children: ["Hello, ", user?.name ?? 'Guest', "! Your MOPTrO is ready."] }), _jsxs("div", { className: "flex gap-6 mt-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-[160px] h-[160px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#05CD99] to-transparent", children: _jsxs("div", { children: [_jsx("img", { src: ChargeIcon, className: "mx-auto mb-2" }), _jsxs("p", { className: "text-3xl font-bold", children: [data.battery, "%"] }), _jsx("p", { className: "text-xs", children: data.chargingStatus })] }) }), _jsx("p", { className: "mt-4", children: data.chargingTime }), _jsx("p", { className: "text-xs text-white/60", children: "Time to full charge" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 flex-1", children: [_jsx(Stat, { title: "Battery Health", value: `${data.batteryHealth}%`, icon: CarIcon }), _jsx(Stat, { title: "Efficiency", value: `+${data.efficiency}%` }), _jsx(Stat, { title: "Consumption", value: `${data.consumption} W/km`, icon: ChargingIcon }), _jsx(Stat, { title: "This Week", value: `${data.distance} km` })] })] })] }));
}
