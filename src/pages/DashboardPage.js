import { jsx as _jsx } from "react/jsx-runtime";
import { lazy, Suspense } from 'react';
import { useAuth } from '@/utils/useAuth';
import { Navigate } from 'react-router-dom';
const Dashboard = lazy(() => import('@/components/dashboard/Dashboard'));
export default function DashboardPage() {
    const { user, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "w-full h-screen flex items-center justify-center text-white", children: "Loading dashboard\u2026" }));
    }
    if (!user) {
        return _jsx(Navigate, { to: "/signin", replace: true });
    }
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "w-full h-screen flex items-center justify-center text-white", children: "Loading dashboard UI\u2026" }), children: _jsx(Dashboard, { user: user }) }));
}
