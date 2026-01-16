import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { logout } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/utils/useAuth';
export default function ProfilePage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    /* sync once */
    if (!loading && user && name === '') {
        setName(user.name);
        setEmail(user.email);
    }
    if (loading) {
        return (_jsx("div", { className: "w-full h-screen flex items-center justify-center text-white", children: "Loading profile\u2026" }));
    }
    if (!user) {
        return _jsx(Navigate, { to: "/signin", replace: true });
    }
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "ml-[294px] p-8 space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between bg-white/10 backdrop-blur rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center gap-5", children: [_jsx("div", { className: "w-[72px] h-[72px] rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold", children: name.charAt(0) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold", children: name }), _jsx("p", { className: "text-sm text-white/60", children: email }), _jsx("span", { className: "inline-block mt-1 px-3 py-[2px] text-xs rounded-full bg-green-500/30", children: "ACTIVE" })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { onClick: () => setEditMode(!editMode), className: "bg-white/10", children: editMode ? 'Cancel' : 'Edit Profile' }), _jsx(Button, { className: "bg-red-600 hover:bg-red-700", onClick: () => {
                                            logout();
                                            navigate('/signin');
                                        }, children: "Logout" })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-6", children: [_jsx(Stat, { label: "Account Type", value: "Standard" }), _jsx(Stat, { label: "Role", value: "User" }), _jsx(Stat, { label: "Status", value: "Active" }), _jsx(Stat, { label: "Member Since", value: "2024" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Personal Information" }), _jsx(Field, { label: "Full Name", value: name, editable: editMode, onChange: setName }), _jsx(Field, { label: "Email", value: email, editable: false }), editMode && (_jsxs("div", { className: "mt-6 flex gap-3", children: [_jsx(Button, { className: "bg-blue-600 hover:bg-blue-700", children: "Save Changes" }), _jsx(Button, { className: "bg-white/10", onClick: () => {
                                                    setName(user.name);
                                                    setEmail(user.email);
                                                    setEditMode(false);
                                                }, children: "Reset" })] }))] }), _jsxs(Card, { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Recent Activity" }), _jsxs("ul", { className: "space-y-3 text-sm text-white/80", children: [_jsx("li", { children: "\u2714 Logged in \u2014 just now" }), _jsx("li", { children: "\u2714 Viewed dashboard" }), _jsx("li", { children: "\u2714 Updated profile" }), _jsx("li", { children: "\u2714 Signed out yesterday" })] })] })] })] })] }));
}
function Card({ children }) {
    return (_jsx("div", { className: "bg-white/10 backdrop-blur rounded-2xl p-6", children: children }));
}
function Stat({ label, value }) {
    return (_jsxs("div", { className: "bg-white/10 rounded-xl p-4", children: [_jsx("p", { className: "text-xs text-white/60", children: label }), _jsx("p", { className: "text-lg font-bold mt-1", children: value })] }));
}
function Field({ label, value, editable, onChange, }) {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-xs uppercase tracking-widest text-white/50", children: label }), editable ? (_jsx("input", { value: value, onChange: (e) => onChange?.(e.target.value), className: "mt-2 w-full bg-black/30 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" })) : (_jsx("p", { className: "mt-2 font-semibold", children: value }))] }));
}
