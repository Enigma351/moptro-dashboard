import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { apiFetch } from '@/utils/apiClient';
export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        apiFetch('/dashboard/products')
            .then((res) => {
            console.log('PRODUCTS API RESPONSE 👉', res);
            setProducts(res);
        })
            .finally(() => setLoading(false));
    }, []);
    if (loading) {
        return (_jsx("div", { className: "absolute rounded-[20px] backdrop-blur p-6 flex items-center justify-center", style: {
                top: '680px',
                left: '420px',
                width: '910px',
                height: '430px',
                background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
            }, children: _jsx("p", { className: "text-white/60", children: "Loading products\u2026" }) }));
    }
    return (_jsxs("div", { className: "absolute rounded-[20px] backdrop-blur p-6", style: {
            top: '680px',
            left: '420px',
            width: '910px',
            height: '430px',
            background: 'linear-gradient(135deg, #060B28F0 0%, #0A0E237D 100%)',
        }, children: [_jsx("h3", { className: "text-lg font-bold", children: "Products" }), _jsx("p", { className: "text-sm text-white/60", children: "Architects design houses" }), _jsx("div", { className: "grid grid-cols-3 gap-6 mt-6", children: products.map((product, i) => (_jsxs("div", { className: "bg-white/5 rounded-[20px] overflow-hidden", children: [_jsx("div", { className: "h-[140px] rounded-t-[20px] bg-black/30 overflow-hidden", children: _jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "p-4", children: [_jsxs("p", { className: "text-xs text-white/60", children: ["Vehicle #", i + 1] }), _jsx("p", { className: "font-bold", children: product.name }), _jsx("p", { className: "text-xs text-white/50 mt-2", children: product.description }), _jsx("button", { className: "mt-4 px-4 py-1 text-xs border rounded-full", children: "Info" })] })] }, product.id))) })] }));
}
