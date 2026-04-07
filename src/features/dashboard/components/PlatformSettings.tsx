import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '@/services/apiClient';
import { cn } from '@/lib/utils';

type Setting = {
  key: string;
  label: string;
  enabled: boolean;
};

export default function PlatformSettings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [syncingKeys, setSyncingKeys] = useState<string[]>([]);

  useEffect(() => {
    apiFetch('/dashboard/settings')
      .then(setSettings)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const toggleSetting = async (key: string) => {
    if (syncingKeys.includes(key)) return;
    
    setSyncingKeys(prev => [...prev, key]);
    try {
      // Optimistic update
      setSettings(prev => prev.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s));
      
      const updated = await apiFetch('/dashboard/settings', {
        method: 'POST',
        body: JSON.stringify({ key }),
      });
      setSettings(updated);
    } catch (err) {
      console.error('Failed to update setting:', err);
      // Revert on error
      apiFetch('/dashboard/settings').then(setSettings);
    } finally {
      setSyncingKeys(prev => prev.filter(k => k !== key));
    }
  };

  const cardBaseStyle = "rounded-[24px] p-6 sm:p-8 w-full min-h-[380px] flex flex-col border border-white/10";
  const cardBgStyle = {
    background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.49) 100%)',
  };

  if (loading) {
    return (
      <div className={`${cardBaseStyle} items-center justify-center`} style={cardBgStyle}>
        <p className="text-white/40 font-black uppercase tracking-widest text-[10px] animate-pulse">Syncing preferences…</p>
      </div>
    );
  }

  if (error || settings.length === 0) {
    return (
      <div className="rounded-[24px] p-6 sm:p-8 w-full min-h-[380px] flex flex-col items-center justify-center border border-red-500/20 bg-red-500/5 shadow-2xl" 
        style={{ background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.49) 100%)' }}
      >
        <p className="text-red-400 font-bold uppercase tracking-[2px] text-[10px]">Failed to synchronize system preferences.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] backdrop-blur-xl p-6 sm:p-8 w-full flex flex-col border border-white/10 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.49) 100%)',
      }}
    >
      <h3 className="text-lg font-black tracking-tight mb-8">Platform Settings</h3>

      <div className="flex-1 space-y-8 lg:space-y-10">
        <div className="space-y-6">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">System Controls</p>
          <div className="space-y-5">
            {settings.map((s) => {
              const IsSyncing = syncingKeys.includes(s.key);
              return (
                <div 
                  key={s.key} 
                  className={cn(
                    "flex items-center justify-between group p-1 transition-opacity",
                    IsSyncing ? "opacity-50 cursor-wait" : "cursor-pointer"
                  )}
                  onClick={() => toggleSetting(s.key)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-bold text-white/60 group-hover:text-white transition-colors">{s.label}</span>
                    {IsSyncing && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[8px] font-black text-[#0075FF] uppercase tracking-widest animate-pulse"
                      >
                        Syncing…
                      </motion.span>
                    )}
                  </div>
                  <Switch checked={s.enabled} onChange={() => toggleSetting(s.key)} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <p className="text-[10px] text-white/20 mt-auto pt-4 italic font-medium">
        * Changes are synchronized across your fleet profile in real-time.
      </p>
    </motion.div>
  );
}

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <motion.button
    type="button"
    whileTap={{ scale: 0.95 }}
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 shadow-inner ${
      checked ? 'bg-[#0075FF]' : 'bg-white/10'
    }`}
  >
    <motion.div 
      animate={{ x: checked ? 22 : 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-lg" 
    />
  </motion.button>
);
