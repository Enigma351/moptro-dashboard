import { motion, type Variants } from 'framer-motion';

import Sidebar from './Sidebar';
import ProfileCard from './ProfileCard';
import MopTroInfo from './MopTroInfo';
import UtilizationCard from './UtilizationCard';
import PlatformSettings from './PlatformSettings';
import Products from './Products';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

/* Variants */

const pageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], 
    },
  },
};

const contentStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardFadeUp: Variants = {
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

export default function Dashboard({
  user,
}: {
  user: AuthUser;
}) {
  return (
    <motion.div
      variants={pageFade}
      initial="hidden"
      animate="visible"
      className="
        relative w-full min-h-[1225px] text-white
        bg-[radial-gradient(1200px_600px_at_20%_-10%,#0B5ED755,transparent),
            radial-gradient(900px_500px_at_90%_10%,#2563EB55,transparent),
            linear-gradient(180deg,#020515,#050B2E,#061A4D)]
      "
    >
      
      <Sidebar />

      <motion.main
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="absolute top-[10px] left-[294px] right-[10px] bottom-[10px]"
      >
        <motion.div variants={cardFadeUp}>
          <ProfileCard user={user} />
        </motion.div>

        <motion.div variants={cardFadeUp}>
          <MopTroInfo user={user} />
        </motion.div>

        <motion.div variants={cardFadeUp}>
          <UtilizationCard />
        </motion.div>

        <motion.div variants={cardFadeUp}>
          <PlatformSettings />
        </motion.div>

        <motion.div variants={cardFadeUp}>
          <Products />
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
