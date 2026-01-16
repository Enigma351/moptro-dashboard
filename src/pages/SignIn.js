import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/layout/AuthNavbar';
import AuthFooter from '@/components/layout/AuthFooter';
import { useAuth } from '@/utils/useAuth';
import leftImage from '@/assets/MOPTro 1.png';
const API_URL = import.meta.env.VITE_API_URL;
export default function SignIn() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    /* logcheck */
    if (!authLoading && user) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || 'Invalid credentials');
                return;
            }
            // token
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem('token', data.token);
            navigate('/dashboard', { replace: true });
        }
        catch {
            setError('Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex justify-center bg-black text-white", children: _jsxs("div", { className: "relative w-[1920px] h-[1300px] overflow-hidden", style: {
                background: 'linear-gradient(164deg, #0F123B 0%, #090D2E 59%, #020515 100%)',
            }, children: [_jsx(AuthNavbar, {}), _jsxs("div", { className: "flex h-full", children: [_jsx("div", { className: "relative", style: {
                                width: '50%',
                                height: '1300px',
                                background: `url(${leftImage}) no-repeat`,
                            }, children: _jsxs("div", { className: "absolute left-[520px] -translate-x-1/2 text-center", style: { top: '612px', width: '363px' }, children: [_jsx("p", { className: "text-[20px] tracking-[3.6px]", children: "INSPIRED BY THE FUTURE:" }), _jsx("p", { className: "mt-[6px] text-[36px] font-bold tracking-[6.48px]", children: "MOPTrO" })] }) }), _jsxs("div", { className: "flex-1 relative", children: [_jsxs("form", { className: "w-[350px] absolute left-1/2 -translate-x-1/2 top-[449px]", onSubmit: handleSubmit, children: [_jsx("h2", { className: "text-[30px] font-bold", children: "Nice to see you!" }), _jsx("p", { className: "text-[14px] text-[#A0AEC0] mt-[6px]", children: "Enter your email and password to sign in" }), _jsxs("div", { className: "mt-[45px]", children: [_jsx("label", { className: "block text-[14px] ml-3", children: "Email" }), _jsx(Input, { type: "email", placeholder: "Your email address", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("div", { className: "mt-[18px]", children: [_jsx("label", { className: "block text-[14px] ml-3", children: "Password" }), _jsx(Input, { type: "password", placeholder: "Your password", value: password, onChange: (e) => setPassword(e.target.value) })] }), _jsxs("div", { className: "flex items-center gap-[10px] mt-[16px]", children: [_jsx("button", { type: "button", onClick: () => setRemember(!remember), className: `relative w-[36px] h-[18px] rounded-full ${remember ? 'bg-[#0075FF]' : 'bg-gray-400'}`, children: _jsx("span", { className: `absolute top-[2px] left-[2px]
                    w-[14px] h-[14px] bg-white rounded-full transition-transform
                    ${remember ? 'translate-x-[18px]' : ''}` }) }), _jsx("span", { className: "text-[14px] text-white/70", children: "Remember me" })] }), error && (_jsx("p", { className: "text-red-400 text-sm mt-3 text-center", children: error })), _jsx(Button, { className: "w-[350px] h-[45px] mt-[38.46px]", disabled: loading, children: loading ? 'Signing in...' : 'SIGN IN' }), _jsx("div", { className: "flex justify-center mt-[14px]", children: _jsxs("p", { className: "text-[14px] text-[#A0AEC0]", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", className: "text-white", children: "Sign up" })] }) })] }), _jsx("div", { className: "absolute left-1/2 -translate-x-1/2 w-[269px]", style: { top: '1036.75px' }, children: _jsx(AuthFooter, {}) })] })] })] }) }));
}
