import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { apiFetch } from '@/services/apiClient';

type UtilizationData = {
  efficiency: number;
  consumption: number;
  distance: number;
  lastTrip: string;
};

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const spring = useSpring(0, { bounce: 0, duration: 1500 });
  const display = useTransform(spring, (current) => Math.round(current) + suffix);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
};

export default function UtilizationCard() {
  const [data, setData] = useState<UtilizationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    apiFetch('/dashboard/utilization')
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const cardBaseStyle = "rounded-[24px] p-6 sm:p-8 w-full min-h-[380px] flex flex-col border border-white/10 shadow-2xl relative overflow-hidden group";
  const cardBgStyle = {
    background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.49) 100%)',
  };

  if (loading) {
    return (
      <div className={`${cardBaseStyle} items-center justify-center`} style={cardBgStyle}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} className="absolute w-64 h-64 bg-[#0075FF]/10 blur-[100px] rounded-full" />
        <p className="text-white/60 animate-pulse font-black uppercase tracking-widest text-[10px] relative z-10">Loading utilization…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${cardBaseStyle} items-center justify-center border border-red-500/20 bg-red-500/5`} style={cardBgStyle}>
        <p className="text-red-400 font-bold uppercase tracking-[2px] text-[10px]">Failed to synchronize utility telemetry.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cardBaseStyle} 
      style={cardBgStyle}
    >
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#01b574] rounded-full blur-[120px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000" />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className="text-2xl font-black tracking-tight">System Utilization</h3>
          <p className="text-[11px] font-bold text-[#01b574] mt-1 flex items-center gap-1 bg-[#01b574]/10 rounded-full px-2 py-0.5 border border-[#01b574]/20 w-max shadow-[0_0_10px_rgba(1,181,116,0.2)]">
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-[#01b574]" />
            <AnimatedCounter value={data.efficiency} suffix="%" /> EFFICIENCY INCREASE
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center mt-8 relative z-10">
        {/* Animated Custom Chart - Equalizer effect (Optimized) */}
        <div className="w-full h-36 bg-[#020515]/50 rounded-[20px] relative overflow-hidden flex items-end justify-between px-6 pb-4 border border-white/5 backdrop-blur-md shadow-inner">
          {[40, 70, 45, 90, 65, 80, 100, 50, 75, 60].map((h, i) => (
            <div key={i} className="w-2.5 sm:w-4 flex items-end justify-center h-full origin-bottom">
              <motion.div 
                animate={{ 
                  scaleY: [0.6, 1, 0.7],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 + (i % 3), 
                  ease: "easeInOut",
                  delay: i * 0.1 
                }}
                className="w-full origin-bottom bg-gradient-to-t from-[#0075FF] to-[#01b574] rounded-t-full shadow-[0_0_15px_rgba(0,117,255,0.4)] will-change-transform" 
                style={{ height: `${h}%`, opacity: 0.6 + (h/200) }}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10">
          <motion.div whileHover={{ y: -5 }} className="flex flex-col gap-1 cursor-default">
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              <AnimatedCounter value={data.distance} />
              <span className="text-[10px] ml-1 text-white/40">KM</span>
            </p>
            <p className="text-[10px] font-bold text-[#0075FF] uppercase tracking-[2px]">Distance</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="flex flex-col gap-1 cursor-default">
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              <AnimatedCounter value={data.consumption} />
              <span className="text-[10px] ml-1 text-white/40">W/H</span>
            </p>
            <p className="text-[10px] font-bold text-[#0075FF] uppercase tracking-[2px]">Avg Power</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="flex flex-col gap-1 cursor-default">
            <p className="text-xl font-black leading-tight truncate text-white">{data.lastTrip}</p>
            <p className="text-[10px] font-bold text-[#0075FF] uppercase tracking-[2px]">Last Trip</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
