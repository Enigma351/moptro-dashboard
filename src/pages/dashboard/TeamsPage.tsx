import { memo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Users } from 'lucide-react';

const teams = [
  { name: 'Design', members: 6, status: 'Active' },
  { name: 'Engineering', members: 12, status: 'Active' },
  { name: 'Marketing', members: 4, status: 'Idle' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white">
      <Sidebar />

      <main className="ml-[294px] p-8">
        <h1 className="text-2xl font-bold mb-6">Teams</h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-6"
        >
          {teams.map((team) => (
            <motion.div
              key={team.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                  <Users size={18} />
                </div>

                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-xs text-white/60">
                    {team.members} members
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    team.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {team.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
});
