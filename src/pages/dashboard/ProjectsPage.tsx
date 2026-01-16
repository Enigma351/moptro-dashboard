import { memo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const projects = [
  { name: 'EV Dashboard', progress: 78, status: 'Active' },
  { name: 'Battery Monitor', progress: 45, status: 'Active' },
  { name: 'Charging Analytics', progress: 92, status: 'Completed' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default memo(function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white">
      <Sidebar />

      <main className="ml-[294px] p-8">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.name}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{project.name}</h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    project.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>

                <p className="text-xs text-white/60 mt-1">
                  {project.progress}% complete
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
});
