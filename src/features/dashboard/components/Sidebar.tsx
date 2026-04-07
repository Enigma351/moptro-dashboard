import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Activity, 
  Settings, 
  LogOut,
  CreditCard,
  X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const location = useLocation();
  
  const navItems = [
    { label: 'Control Center', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Pilot Profile', path: '/profile', icon: User },
    { label: 'Fleet Telemetrics', path: '/telemetrics', icon: Activity },
    { label: 'Energy Pricing', path: '/billing', icon: CreditCard },
    { label: 'System Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[320px] transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        bg-[#020515]/80 backdrop-blur-[40px] border-r border-white/10 shadow-[0_0_50px_rgba(0,117,255,0.05)]
        lg:static lg:translate-x-0 lg:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-8 relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#0075FF] rounded-full blur-[100px] opacity-20 pointer-events-none" />

          {/* Logo & Close */}
          <div className="flex items-center justify-between mb-12 px-2 relative z-10">
            <div className="flex flex-col">
              <Typography variant="h3" className="tracking-[4px] text-white premium-glow-text">MOPTrO</Typography>
              <Typography variant="small" className="text-[#0075FF] mt-1 font-bold">FLEET VERSION 1.0</Typography>
            </div>
            <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-2 relative z-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose()}
                  className="relative group flex items-center gap-4 px-5 py-4 rounded-2xl transition-colors outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[#0075FF]/90 to-[#0075FF]/60 rounded-2xl shadow-[0_0_20px_rgba(0,117,255,0.4)] border border-white/20"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <item.icon 
                      size={20} 
                      className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`} 
                    />
                    <Typography 
                      variant="small" 
                      className={`transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-white/50 group-hover:text-white'}`}
                    >
                      {item.label}
                    </Typography>
                  </div>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout & Footer */}
          <div className="mt-auto pt-8 relative z-10">
            <Button 
              variant="danger" 
              className="w-full justify-start gap-4 px-5 py-5 rounded-2xl transition-all duration-500 group bg-white/5 hover:bg-red-500/20 hover:border-red-500/50 border border-white/5 shadow-none overflow-hidden relative"
              onClick={() => logout()}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              <LogOut size={20} className="text-white/50 group-hover:text-red-400 group-hover:rotate-12 transition-all duration-300 relative z-10" />
              <Typography variant="small" className="text-white/50 group-hover:text-red-400 transition-colors duration-300 relative z-10">
                Terminate Session
              </Typography>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
