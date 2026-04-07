import { motion, type Variants } from 'framer-motion';
import ProfileCard from './ProfileCard';
import MopTroInfo from './MopTroInfo';
import UtilizationCard from './UtilizationCard';
import PlatformSettings from './PlatformSettings';
import Products from './Products';
import RecentOrders from './RecentOrders';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

/* Variants */

const contentStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], 
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
      variants={contentStagger}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 w-full pb-10"
    >
      <motion.div variants={cardFadeUp}>
        <ProfileCard user={user} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={cardFadeUp}>
          <MopTroInfo user={user} />
        </motion.div>

        <motion.div variants={cardFadeUp}>
          <UtilizationCard />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={cardFadeUp}>
          <PlatformSettings />
        </motion.div>

        <motion.div variants={cardFadeUp}>
          <Products />
        </motion.div>
      </div>

      <motion.div variants={cardFadeUp}>
        <RecentOrders />
      </motion.div>
    </motion.div>
  );
}
