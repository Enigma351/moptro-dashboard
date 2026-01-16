import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
const teams = [
    { name: 'Design', members: 6, status: 'Active' },
    { name: 'Engineering', members: 12, status: 'Active' },
    { name: 'Marketing', members: 4, status: 'Idle' },
];
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
};
export default memo(function TeamsPage() {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "ml-[294px] p-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Teams" }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "grid grid-cols-3 gap-6", children: teams.map((team) => (_jsxs(motion.div, { variants: cardVariants, whileHover: { y: -6 }, className: "bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 transition", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center", children: _jsx(Users, { size: 18 }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: team.name }), _jsxs("p", { className: "text-xs text-white/60", children: [team.members, " members"] })] })] }), _jsx("div", { className: "mt-4", children: _jsx("span", { className: `text-xs px-3 py-1 rounded-full ${team.status === 'Active'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-yellow-500/20 text-yellow-400'}`, children: team.status }) })] }, team.name))) })] })] }));
});
