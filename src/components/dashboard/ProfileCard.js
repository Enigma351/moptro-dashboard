import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProfileImg from '@/assets/ProfilePicture.png';
import EditImg from '@/assets/Edit.png';
import { useNavigate, useLocation } from 'react-router-dom';
function Tab({ label, path }) {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname === path;
    return (_jsx("button", { onClick: () => navigate(path), className: `px-3 py-1 rounded-full text-xs font-bold transition ${active ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'}`, children: label }));
}
export default function ProfileCard({ user }) {
    const name = user?.name ?? 'Guest User';
    const email = user?.email ?? '—';
    return (_jsxs("div", { className: "absolute flex items-center justify-between rounded-[20px] backdrop-blur", style: {
            top: '117px',
            left: '35px',
            width: '95%',
            height: '129px',
            padding: '24px',
            background: 'linear-gradient(94deg, #0B5ED7 0%, #0A0E237D 100%)',
        }, children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative w-[80px] h-[80px]", children: [_jsx("img", { src: ProfileImg, alt: "Profile", className: "rounded-[20px] w-full h-full object-cover" }), _jsx("img", { src: EditImg, alt: "Edit", className: "absolute bottom-[-6px] right-[-6px] w-[26px]" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-bold leading-tight", children: name }), _jsx("p", { className: "text-sm text-white/60", children: email })] })] }), _jsxs("div", { className: "flex gap-10", children: [_jsx(Tab, { label: "OVERVIEW", path: "/dashboard" }), _jsx(Tab, { label: "TEAMS", path: "/teams" }), _jsx(Tab, { label: "PROJECTS", path: "/projects" })] })] }));
}
