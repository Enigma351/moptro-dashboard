import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import ProfileCard from './ProfileCard';
import MopTroInfo from './MopTroInfo';
import UtilizationCard from './UtilizationCard';
import PlatformSettings from './PlatformSettings';
import Products from './Products';
/* Variants */
const pageFade = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};
const contentStagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};
const cardFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1], // ✅ valid easing
        },
    },
};
/* Component */
export default function Dashboard({ user, }) {
    return (_jsxs(motion.div, { variants: pageFade, initial: "hidden", animate: "visible", className: "\r\n        relative w-full min-h-[1225px] text-white\r\n        bg-[radial-gradient(1200px_600px_at_20%_-10%,#0B5ED755,transparent),\r\n            radial-gradient(900px_500px_at_90%_10%,#2563EB55,transparent),\r\n            linear-gradient(180deg,#020515,#050B2E,#061A4D)]\r\n      ", children: [_jsx(Sidebar, {}), _jsxs(motion.main, { variants: contentStagger, initial: "hidden", animate: "visible", className: "absolute top-[10px] left-[294px] right-[10px] bottom-[10px]", children: [_jsx(motion.div, { variants: cardFadeUp, children: _jsx(ProfileCard, { user: user }) }), _jsx(motion.div, { variants: cardFadeUp, children: _jsx(MopTroInfo, { user: user }) }), _jsx(motion.div, { variants: cardFadeUp, children: _jsx(UtilizationCard, {}) }), _jsx(motion.div, { variants: cardFadeUp, children: _jsx(PlatformSettings, {}) }), _jsx(motion.div, { variants: cardFadeUp, children: _jsx(Products, {}) })] })] }));
}
