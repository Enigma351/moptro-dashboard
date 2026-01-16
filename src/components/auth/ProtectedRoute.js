import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/utils/useAuth';
export default function ProtectedRoute({ children, }) {
    const { user, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "w-full h-screen flex items-center justify-center text-white", children: "Checking authentication..." }));
    }
    if (!user) {
        return _jsx(Navigate, { to: "/signin", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
