import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '@/services/apiClient';
import { Typography } from '@/components/ui/typography';
import { Box, Zap, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type Order = {
  _id: string;
  productName: string;
  color: string;
  battery: string;
  autopilot: boolean;
  wheels?: string;
  softwarePackage?: string;
  price: string;
  createdAt: string;
};

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/dashboard/orders')
      .then(setOrders)
      .catch(err => console.error('Failed to fetch orders:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="rounded-[24px] border border-white/10 p-8 bg-white/5 animate-pulse min-h-[300px] flex items-center justify-center">
        <Typography variant="small" className="text-white/20 tracking-[4px]">Fetching fleet history…</Typography>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
        <div className="rounded-[24px] border border-white/10 p-12 bg-white/5 text-center flex flex-col items-center justify-center gap-4">
            <Box size={40} className="text-white/10" />
            <Typography variant="h3" className="text-white/40">No configuration logs found.</Typography>
            <Typography variant="p" className="text-white/20 text-xs uppercase tracking-widest leading-relaxed">
                Initialize vehicle configurations to populate the registry.
            </Typography>
        </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[24px] border border-white/10 overflow-hidden shadow-2xl relative group"
      style={{
        background: 'linear-gradient(135deg, rgba(6, 11, 40, 0.94) 0%, rgba(10, 14, 35, 0.49) 100%)',
      }}
    >
      <div className="p-6 sm:p-8 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0075FF]/10 flex items-center justify-center">
            <Clock size={18} className="text-[#0075FF]" />
          </div>
          <div>
            <Typography variant="h3" className="text-lg">Recent Fleet Inclusion Logs</Typography>
            <Typography variant="p" className="text-[10px] uppercase tracking-[2px] text-white/40">Secure Telemetry Registry</Typography>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#01b574]/10 rounded-full border border-[#01b574]/20">
          <ShieldCheck size={14} className="text-[#01b574]" />
          <span className="text-[10px] font-black text-[#01b574] uppercase">Verified Logs</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-white/5 uppercase tracking-widest text-[10px] text-white/40 border-b border-white/10">
              <th className="px-8 py-4 font-black">Model</th>
              <th className="px-8 py-4 font-black text-center">Configuration</th>
              <th className="px-8 py-4 font-black">Investment</th>
              <th className="px-8 py-4 font-black text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition-colors group/row">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0075FF] animate-pulse" />
                    <Typography variant="small" className="font-bold text-white tracking-widest uppercase">{order.productName}</Typography>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border",
                      order.color === 'obsidian' ? "bg-black text-white border-white/20" : 
                      order.color === 'pearl' ? "bg-slate-200 text-black border-white/20" :
                      "bg-[#1e3a8a] text-white border-white/20"
                    )}>
                      {order.color}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-white/60 text-[9px] font-black uppercase tracking-wider border border-white/10">
                      {order.battery.replace('_', ' ')}
                    </span>
                    {order.autopilot && (
                      <span className="px-2 py-0.5 rounded bg-[#01b574]/10 text-[#01b574] text-[9px] font-black uppercase tracking-wider border border-[#01b574]/20 flex items-center gap-1">
                        <Zap size={8} /> Neural
                      </span>
                    )}
                    {order.wheels && order.wheels !== 'standard' && (
                      <span className="px-2 py-0.5 rounded bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-wider border border-white/10">
                        {order.wheels} Rims
                      </span>
                    )}
                    {order.softwarePackage && order.softwarePackage !== 'basic' && (
                      <span className="px-2 py-0.5 rounded bg-[#0075FF]/10 text-[#0075FF] text-[9px] font-black uppercase tracking-wider border border-[#0075FF]/20">
                        {order.softwarePackage} OS
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <Typography variant="small" className="font-mono text-[#0075FF] font-black">{order.price}</Typography>
                </td>
                <td className="px-8 py-5 text-right">
                  <Typography variant="p" className="text-[10px] text-white/30 lowercase">
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
