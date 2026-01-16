import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/layout/AuthNavbar';
import AuthFooter from '@/components/layout/AuthFooter';
import { useAuth } from '@/utils/useAuth';
import leftImage from '@/assets/MOPTro 1.png';
const API_URL = import.meta.env.VITE_API_URL;
export default function SignUp() {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    if (!authLoading && user) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    const handleSubmit = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || 'Signup failed');
                return;
            }
            localStorage.setItem('token', data.token);
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
                            }, children: _jsxs("div", { className: "absolute left-[520px] -translate-x-1/2 text-center", style: { top: '612px', width: '363px' }, children: [_jsx("p", { className: "text-[20px] tracking-[3.6px]", children: "INSPIRED BY THE FUTURE:" }), _jsx("p", { className: "mt-[6px] text-[36px] font-bold tracking-[6.48px]", children: "MOPTrO" })] }) }), _jsxs("div", { className: "flex-1 relative", children: [_jsxs("div", { className: "absolute left-1/2 -translate-x-1/2 text-center", style: { top: '218.75px', width: '333px' }, children: [_jsx("h2", { className: "text-[30px] font-bold", children: "Welcome!" }), _jsx("p", { className: "mt-[6px] text-[14px] text-[#A0AEC0] leading-[24px]", children: "Use these awesome forms to create a new account." })] }), _jsx("div", { className: "absolute left-1/2 -translate-x-1/2 border-2 border-white rounded-[20px]", style: {
                                        top: '368px',
                                        width: '453px',
                                        height: '714px',
                                        backdropFilter: 'blur(42px)',
                                        background: 'rgba(148,163,184,0.18)',
                                    }, children: _jsxs("div", { className: "px-[36px] pt-[44px]", children: [_jsxs("div", { className: "mt-[20px] space-y-[24px]", children: [_jsx(Input, { placeholder: "Your full name", value: name, onChange: (e) => setName(e.target.value) }), _jsx(Input, { placeholder: "Your email address", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(Input, { type: "password", placeholder: "Your password", value: password, onChange: (e) => setPassword(e.target.value) })] }), error && (_jsx("p", { className: "text-red-400 text-sm mt-4 text-center", children: error })), _jsx(Button, { className: "w-[350px] h-[45px] mt-[45px]", onClick: handleSubmit, disabled: loading, children: loading ? 'Signing up...' : 'SIGN UP' }), _jsxs("p", { className: "text-center text-[14px] text-[#A0AEC0] mt-[22px]", children: ["Already have an account?", ' ', _jsx(Link, { to: "/signin", className: "text-white", children: "Sign in" })] })] }) }), _jsx("div", { className: "absolute left-1/2 -translate-x-1/2 w-[269px]", style: { top: '1112px' }, children: _jsx(AuthFooter, {}) })] })] })] }) }));
}
