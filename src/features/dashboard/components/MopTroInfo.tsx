import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import ChargeIcon from '@/assets/charge.svg';
import CarIcon from '@/assets/Group.svg';
import ChargingIcon from '@/assets/Charging.svg';
import { apiFetch } from '@/services/apiClient';
import { Card, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

type OverviewData = {
  battery: number;
  chargingStatus: string;
  chargingTime: string;
  batteryHealth: number;
  efficiency: number;
  consumption: number;
  distance: number;
};

const StatCard = ({ title, value, icon }: { title: string; value: string; icon?: string }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="bg-white/5 rounded-2xl p-4 sm:p-6 flex flex-col justify-between hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group h-full relative overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(0,117,255,0.15)]"
  >
    <div className="absolute -inset-24 bg-gradient-to-tr from-[#0075FF]/0 via-[#0075FF]/0 to-[#0075FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
    <div className="flex justify-between items-start gap-2 relative z-10">
      <div className="min-w-0">
        <Typography variant="small" className="text-white/40 mb-1">{title}</Typography>
        <Typography variant="large" className="group-hover:text-white transition-colors text-2xl font-black tracking-tight">{value}</Typography>
      </div>
      {icon && (
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0075FF]/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#0075FF]/20 group-hover:bg-[#0075FF]/20 transition-colors"
        >
          <img src={icon} alt="" className="w-5 sm:w-6 opacity-80 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_#0075FF] transition-all" />
        </motion.div>
      )}
    </div>
  </motion.div>
);

export default function MopTroInfo({
  user,
}: {
  user?: { name?: string };
}) {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiFetch('/dashboard/overview')
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card variant="glass" className="min-h-[400px] flex items-center justify-center border-none bg-glass relative overflow-hidden shadow-2xl">
         <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-48 h-48 rounded-full bg-[#0075FF] blur-[120px] opacity-20 absolute"
          />
        <Typography variant="small" className="text-white/40 animate-pulse relative z-10">Synchronizing Fleet Data…</Typography>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card variant="glass" className="min-h-[400px] flex items-center justify-center border border-red-500/20 bg-red-500/5 shadow-2xl">
        <Typography variant="small" className="text-red-400 font-bold">Failed to sync with MOPTrO Server.</Typography>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="min-h-[400px] flex flex-col p-8 sm:p-10 border-none bg-glass shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#01b574] rounded-full blur-[150px] opacity-10 pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 relative z-10">
        <div>
          <CardTitle className="text-2xl">Global Fleet Command Center</CardTitle>
          <Typography variant="p" className="mt-1 text-white/40">
            Welcome back. <span className="text-white font-bold">{user?.name ?? 'Administrator'}</span>, all systems are currently operational.
          </Typography>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#01b574]/10 rounded-full border border-[#01b574]/30 shadow-[0_0_15px_rgba(1,181,116,0.2)]">
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
            transition={{ duration: 2, repeat: Infinity }} 
            className="w-2 h-2 rounded-full bg-[#01b574]" 
          />
          <Typography variant="small" className="text-[#01b574] normal-case font-bold tracking-wide">Nominal</Typography>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 flex-1 relative z-10">
        {/* Animated Battery Cluster */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center justify-center lg:w-[260px] relative cursor-pointer group shrink-0"
        >
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg className="absolute w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(5,205,153,0.3)]">
              {/* Decorative Background Rings */}
              <circle cx="50%" cy="50%" r="46%" className="stroke-white/5 fill-none" strokeWidth="6" />
              <circle cx="50%" cy="50%" r="38%" className="stroke-white/5 fill-none" strokeWidth="1" strokeDasharray="4 4" />
              
              <motion.circle
                cx="50%" cy="50%" r="46%"
                className="stroke-[#05CD99] fill-none drop-shadow-[0_0_10px_rgba(5,205,153,0.8)]"
                strokeWidth="10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: data.battery / 100 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            {/* Inner Glowing Orb */}
            <motion.div
               animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute w-28 h-28 bg-[#05CD99] rounded-full blur-[40px] opacity-30 group-hover:bg-[#0075FF] transition-colors duration-1000"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center z-10 flex flex-col items-center gap-1"
            >
              <img src={ChargeIcon} className="w-7 h-7 mb-0.5 opacity-60 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" alt="charge" />
              <Typography variant="h2" className="text-4xl text-white premium-glow-text leading-none">{data.battery}%</Typography>
              <Typography variant="small" className="text-[#05CD99] uppercase font-black">{data.chargingStatus}</Typography>
            </motion.div>
          </div>

          <div className="mt-8 text-center transition-transform group-hover:-translate-y-2">
            <Typography variant="large" className="text-2xl font-black">{data.chargingTime}</Typography>
            <Typography variant="small" className="text-white/30 mt-1">ESTIMATED FULL CHARGE</Typography>
          </div>
        </motion.div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
          <StatCard
            title="Battery State of Health"
            value={`${data.batteryHealth}%`}
            icon={CarIcon}
          />
          <StatCard
            title="Operational Efficiency"
            value={`+${data.efficiency}%`}
          />
          <StatCard
            title="Energy Density"
            value={`${data.consumption} W/km`}
            icon={ChargingIcon}
          />
          <StatCard
            title="Lifetime Fleet Mileage"
            value={`${data.distance} km`}
          />
        </div>
      </div>
    </Card>
  );
}
