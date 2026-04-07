import { Link } from 'react-router-dom';
import { Settings, User, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export default function ProfileCard({ user }: { user: AuthUser }) {
  return (
    <Card 
      variant="glass" 
      className="flex flex-col sm:flex-row items-center justify-between gap-8 p-6 sm:p-10 border-none"
    >
      <div className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto text-center sm:text-left">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] bg-gradient-to-br from-[#0075FF] to-[#125eff] flex items-center justify-center text-white text-4xl font-black shadow-[0_15px_30px_rgba(0,117,255,0.3)]"
        >
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </motion.div>

        <div className="flex flex-col gap-1">
          <Typography variant="h3">{user.name}</Typography>
          <Typography variant="p" className="text-white/40">{user.email}</Typography>
          <div className="flex items-center gap-3 mt-4 mx-auto sm:mx-0">
            <Typography variant="small" className="px-4 py-1 bg-[#01b57422] text-[#01b574] rounded-full border border-[#01b57433]">
              PREMIUM USER
            </Typography>
            <div className="w-2 h-2 rounded-full bg-[#01b574] animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:flex items-center gap-3 sm:gap-4 w-full sm:w-auto mt-6 sm:mt-0">
        {[
          { to: '/profile', icon: User, label: 'Profile' },
          { to: '/settings', icon: Settings, label: 'Settings' },
          { to: '/billing', icon: CreditCard, label: 'Billing' },
        ].map((item) => (
          <Link 
            key={item.label}
            to={item.to} 
            className="w-full sm:w-auto"
          >
            <Button 
              variant="outline" 
              className="w-full flex-col sm:flex-row h-auto py-4 sm:py-3 px-4 sm:px-6 gap-2 sm:gap-3 group border-white/5 bg-white/5 hover:bg-white/10 rounded-2xl"
            >
              <item.icon size={18} className="text-white/40 group-hover:text-[#0075FF] transition-colors" />
              <Typography variant="small" className="text-white/60 group-hover:text-white text-[10px] sm:text-xs">{item.label}</Typography>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}
