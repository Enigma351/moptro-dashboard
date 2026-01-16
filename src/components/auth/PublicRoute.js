import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/utils/useAuth';
export default function PublicRoute({ children, }) {
    const { user, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "w-full h-screen flex items-center justify-center text-white", children: "Checking session..." }));
    }
    // login check
    if (user) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
