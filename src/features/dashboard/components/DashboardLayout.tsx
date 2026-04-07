import { useState, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { Typography } from '@/components/ui/typography';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen text-white bg-[#020515] bg-gradient-main">
      {/* Mobile Top Navigation */}
      <header className="lg:hidden flex items-center justify-between p-3 px-6 z-[60] sticky top-0 bg-[#020515]/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
        <Typography variant="large" className="text-[#0075FF] tracking-[5px] font-black drop-shadow-[0_0_8px_#0075FF22]">MOPTrO</Typography>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all active:scale-95 shadow-inner"
        >
          {isSidebarOpen ? <X size={20} className="text-white/80" /> : <Menu size={20} className="text-[#0075FF]" />}
        </button>
      </header>
      
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 relative z-10 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
