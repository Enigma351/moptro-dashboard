import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import dashboardIcon from '@/assets/Icon.png';
import profileIcon from '@/assets/Profile.png';
import signupIcon from '@/assets/Signup.png';
import signinIcon from '@/assets/Signin.png';
export default function AuthNavbar() {
    return (_jsxs("nav", { className: "\r\n        absolute top-[24px] left-1/2 -translate-x-1/2 z-50\r\n        w-[650px] h-[70px]\r\n        flex items-center justify-center gap-10\r\n        rounded-[20px] border-2 border-white text-[11px] text-white\r\n      ", style: {
            backdropFilter: 'blur(42px)',
            WebkitBackdropFilter: 'blur(42px)',
        }, children: [_jsxs(NavLink, { to: "/dashboard", className: ({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-white' : 'text-white/70'}`, children: [_jsx("img", { src: dashboardIcon, alt: "Dashboard", className: "w-[11px] h-[11px]" }), "DASHBOARD"] }), _jsxs(NavLink, { to: "/profile", className: ({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-white' : 'text-white/70'}`, children: [_jsx("img", { src: profileIcon, alt: "Profile", className: "w-[11px] h-[11px]" }), "PROFILE"] }), _jsxs(NavLink, { to: "/signup", className: ({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-white' : 'text-white/70'}`, children: [_jsx("img", { src: signupIcon, alt: "Sign Up", className: "w-[11px] h-[11px]" }), "SIGNUP"] }), _jsxs(NavLink, { to: "/signin", className: ({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-white' : 'text-white/70'}`, children: [_jsx("img", { src: signinIcon, alt: "Sign In", className: "w-[11px] h-[11px]" }), "SIGNIN"] })] }));
}
