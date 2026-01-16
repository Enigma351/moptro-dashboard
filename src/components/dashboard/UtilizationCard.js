import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { apiFetch } from '@/utils/apiClient';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
    },
    scales: {
        x: { display: false },
        y: { min: 0, max: 100 },
    },
};
export default function UtilizationCard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        apiFetch('/dashboard/utilization')
            .then((res) => {
            setData({
                change: res.change ?? 0,
                chart: Array.isArray(res.chart) ? res.chart : [],
                stats: Array.isArray(res.stats) ? res.stats : [],
            });
        })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);
    if (loading) {
        return (_jsx("div", { className: "absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center", style: {
                top: '270px',
                left: '790px',
                width: '540px',
                height: '377px',
                background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
            }, children: _jsx("p", { className: "text-white/60", children: "Loading utilization\u2026" }) }));
    }
    if (error || !data) {
        return (_jsx("div", { className: "absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center", style: {
                top: '270px',
                left: '790px',
                width: '540px',
                height: '377px',
                background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
            }, children: _jsx("p", { className: "text-red-400", children: "Failed to load utilization" }) }));
    }
    const chartData = {
        labels: data.chart.map((_, i) => `${i + 1}`),
        datasets: [
            {
                data: data.chart,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                barThickness: 5,
            },
        ],
    };
    return (_jsxs("div", { className: "absolute rounded-[20px] backdrop-blur p-6", style: {
            top: '270px',
            left: '790px',
            width: '540px',
            height: '377px',
            background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }, children: [_jsx("h3", { className: "text-lg font-bold", children: "Utilization" }), _jsxs("p", { className: "text-sm text-green-400 mt-1", children: ["(+", data.change, "%) than last week"] }), _jsx("div", { className: "mt-5 h-[170px] rounded-[15px] bg-black/30 px-4 py-3", children: _jsx(Bar, { data: chartData, options: options }) }), _jsx("div", { className: "grid grid-cols-4 gap-4 mt-5", children: data.stats.map((item) => (_jsxs("div", { className: "bg-white/5 rounded-[15px] p-3", children: [_jsx("p", { className: "text-[10px] text-white/60", children: item.label }), _jsx("p", { className: "text-[14px] font-bold mt-1", children: item.value })] }, item.label))) })] }));
}
