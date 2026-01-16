import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { motion } from 'framer-motion';
const projects = [
    { name: 'EV Dashboard', progress: 78, status: 'Active' },
    { name: 'Battery Monitor', progress: 45, status: 'Active' },
    { name: 'Charging Analytics', progress: 92, status: 'Completed' },
];
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};
const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};
export default memo(function ProjectsPage() {
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "ml-[294px] p-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Projects" }), _jsx(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "space-y-5", children: projects.map((project) => (_jsxs(motion.div, { variants: cardVariants, className: "bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "font-semibold", children: project.name }), _jsx("span", { className: `text-xs px-3 py-1 rounded-full ${project.status === 'Completed'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-blue-500/20 text-blue-400'}`, children: project.status })] }), _jsxs("div", { className: "mt-4", children: [_jsx("div", { className: "h-2 bg-white/10 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${project.progress}%` }, transition: { duration: 0.8, ease: 'easeOut' }, className: "h-full bg-blue-600 rounded-full" }) }), _jsxs("p", { className: "text-xs text-white/60 mt-1", children: [project.progress, "% complete"] })] })] }, project.name))) })] })] }));
});
