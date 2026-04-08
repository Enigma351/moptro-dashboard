import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/ui/typography';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Shield, Bell, Smartphone, Lock, X, CheckCircle2, QrCode, AlertCircle } from 'lucide-react';
import PlatformSettings from '@/features/dashboard/components/PlatformSettings';
import { apiFetch } from '@/services/apiClient';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Password State
  const [passwordState, setPasswordState] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    // Fetch user profile to get 2FA status
    const fetchProfile = async () => {
      try {
        const responseData = await apiFetch('/auth/profile');
        setTwoFactorEnabled(responseData.twoFactorEnabled || false);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordState.new !== passwordState.confirm) {
      setPasswordFeedback({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordFeedback(null);

    try {
      await apiFetch('/auth/password', {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword: passwordState.current,
          newPassword: passwordState.new
        })
      });
      setPasswordFeedback({ type: 'success', message: 'Entropy threshold reached. Password successfully rotated.' });
      setPasswordState({ current: '', new: '', confirm: '' });
    } catch (err: any) {
      setPasswordFeedback({ type: 'error', message: err.message || 'Node authentication failed. Verify current credentials.' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const tabs = ['General', 'Security', 'Notifications', 'Connected Devices'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-7xl mx-auto pb-20 px-4 sm:px-0"
    >
      <div className="flex flex-col gap-2">
        <Typography variant="h2">System Configuration</Typography>
        <Typography variant="p" className="text-white/50">Manage your application preferences, security protocols, and platform alerts.</Typography>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar - Responsive Scroll on Mobile */}
        <div className="w-full lg:w-64 flex lg:flex-col gap-2 shrink-0 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-left relative overflow-hidden group min-w-[160px] lg:min-w-0 ${
                  isActive ? 'text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="settings-active-tab"
                    className="absolute inset-0 bg-[#0075FF]/10 border border-[#0075FF]/20 rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  {tab === 'General' && <Settings size={18} />}
                  {tab === 'Security' && <Shield size={18} />}
                  {tab === 'Notifications' && <Bell size={18} />}
                  {tab === 'Connected Devices' && <Smartphone size={18} />}
                  <Typography variant="small" className={`font-bold tracking-wide whitespace-nowrap ${isActive ? 'text-[#0075FF]' : ''}`}>
                    {tab}
                  </Typography>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Pane */}
        <div className="flex-1 w-full min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'General' && (
                <div className="space-y-6">
                  <PlatformSettings />
                  
                  <Card className="p-0 overflow-hidden">
                    <CardTitle className="p-6 lg:p-8 pb-4">Localization</CardTitle>
                    <CardContent className="p-6 lg:p-8 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <Typography variant="small" className="text-white/60">Timezone</Typography>
                         <Input defaultValue="Pacific Time (US & Canada)" disabled />
                      </div>
                      <div className="space-y-2">
                         <Typography variant="small" className="text-white/60">Date Format</Typography>
                         <Input defaultValue="DD/MM/YYYY" disabled />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'Security' && (
                <div className="space-y-6">
                  <Card variant="glass" className="relative overflow-hidden group p-0">
                     <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] pointer-events-none transition-colors duration-700 ${twoFactorEnabled ? "bg-[#01b574]/10" : "bg-yellow-500/10"}`} />
                     <CardTitle className="p-6 lg:p-8 pb-0 flex items-center gap-3">
                       <Smartphone size={20} className={twoFactorEnabled ? "text-[#01b574]" : "text-yellow-500"} /> 
                       Multi-Factor Authentication (MFA)
                     </CardTitle>
                     <CardContent className="p-6 lg:p-8">
                       <Typography variant="p" className="text-white/60 text-sm mb-6 max-w-xl">
                         Secure your neural node with an auxiliary verification layer. Sign-ins will require a secondary authentication token.
                       </Typography>
                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                         <Button 
                           onClick={() => {
                             if (twoFactorEnabled) {
                               // simulated disable
                               setTwoFactorEnabled(false);
                               apiFetch('/auth/2fa', { method: 'PUT', body: JSON.stringify({ enabled: false }) });
                             } else {
                               setIs2FAModalOpen(true);
                             }
                           }}
                           className={`font-black uppercase tracking-widest text-xs h-12 px-8 rounded-xl transition-all ${
                             twoFactorEnabled 
                               ? "bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400" 
                               : "bg-yellow-500 hover:bg-yellow-600 text-black shadow-[0_15px_30px_rgba(234,179,8,0.2)]"
                           }`}
                         >
                           {twoFactorEnabled ? 'Disable MFA' : 'Enable 2FA Protocol'}
                         </Button>
                         {twoFactorEnabled && (
                           <div className="flex items-center gap-2 text-[#01b574] text-[10px] font-black uppercase tracking-widest">
                             <CheckCircle2 size={14} /> ACTIVE NODAL SECURITY
                           </div>
                         )}
                       </div>
                     </CardContent>
                  </Card>

                  <Card className="p-0 overflow-hidden">
                     <CardTitle className="p-6 lg:p-8 pb-0 flex items-center gap-3"><Lock size={20} className="text-[#0075FF]" /> Password Configuration</CardTitle>
                     <CardContent className="p-6 lg:p-8">
                        {passwordFeedback && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest border ${
                              passwordFeedback.type === 'success' ? "bg-[#01b574]/10 border-[#01b574]/20 text-[#01b574]" : "bg-red-500/10 border-red-500/20 text-red-500"
                            }`}
                          >
                            {passwordFeedback.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                            {passwordFeedback.message}
                          </motion.div>
                        )}
                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                           <div className="space-y-2">
                              <Typography variant="small" className="text-white/60">Current Password</Typography>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                value={passwordState.current}
                                onChange={(e) => setPasswordState({...passwordState, current: e.target.value})}
                                required
                              />
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <Typography variant="small" className="text-white/60">New Password</Typography>
                                 <Input 
                                   type="password" 
                                   placeholder="••••••••" 
                                   value={passwordState.new}
                                   onChange={(e) => setPasswordState({...passwordState, new: e.target.value})}
                                   required
                                 />
                              </div>
                              <div className="space-y-2">
                                 <Typography variant="small" className="text-white/60">Confirm Password</Typography>
                                 <Input 
                                   type="password" 
                                   placeholder="••••••••" 
                                   value={passwordState.confirm}
                                   onChange={(e) => setPasswordState({...passwordState, confirm: e.target.value})}
                                   required
                                 />
                              </div>
                           </div>
                           <div className="pt-2">
                              <Button 
                                type="submit" 
                                disabled={isUpdatingPassword}
                                className="w-full sm:w-auto bg-[#0075FF] text-white hover:bg-[#125eff] font-black uppercase tracking-widest text-xs h-12 px-8 rounded-xl shadow-[0_15px_30px_rgba(0,117,255,0.2)]"
                              >
                                {isUpdatingPassword ? 'Syncing...' : 'Update Password Node'}
                              </Button>
                           </div>
                        </form>
                     </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'Notifications' && (
                <div className="flex items-center justify-center p-20 text-center flex-col gap-4">
                   <Bell size={48} className="text-white/10" />
                   <Typography variant="h3" className="text-white/30 uppercase tracking-widest text-sm">Nodal Alerts Mapped to General Tab</Typography>
                </div>
              )}

              {activeTab === 'Connected Devices' && (
                <div className="flex items-center justify-center p-20 text-center flex-col gap-4">
                   <Smartphone size={48} className="text-white/10" />
                   <Typography variant="h3" className="text-white/30 uppercase tracking-widest text-sm">No Active Remote Neural Links</Typography>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 2FA Simulation Modal */}
      <AnimatePresence>
        {is2FAModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIs2FAModalOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-md max-h-[90vh] bg-[#050B2E] border border-white/10 rounded-[32px] shadow-3xl overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setIs2FAModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors z-20 bg-black/20 backdrop-blur-md"
              >
                <X size={20} className="text-white/40" />
              </button>

              <div className="overflow-y-auto flex-1 scrollbar-hide">
                <div className="p-8 sm:p-10 text-center">
                  <div className="w-16 h-16 bg-[#0075FF]/10 rounded-2xl border border-[#0075FF]/20 flex items-center justify-center mx-auto mb-6">
                    <QrCode size={32} className="text-[#0075FF]" />
                  </div>
                  
                  <Typography variant="h3" className="uppercase tracking-tighter mb-4">Initialize 2FA Protocol</Typography>
                  <Typography variant="p" className="text-white/40 text-[10px] mb-8 uppercase tracking-widest font-black leading-relaxed">
                    Scan the QR code with your authenticator node to synchronize encryption keys.
                  </Typography>

                  <div className="bg-white p-6 rounded-3xl w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 relative group">
                    <div className="absolute inset-0 bg-[#0075FF] opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl" />
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MOPTRO_SECURE_NODE" 
                      alt="2FA QR Code"
                      className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <Input 
                      placeholder="000 000" 
                      className="text-center text-xl sm:text-2xl font-mono tracking-[8px] sm:tracking-[10px] h-14 sm:h-16 bg-white/5 border-white/10 rounded-2xl"
                      maxLength={6}
                    />
                    <Button 
                      onClick={async () => {
                        setTwoFactorEnabled(true);
                        setIs2FAModalOpen(false);
                        await apiFetch('/auth/2fa', { method: 'PUT', body: JSON.stringify({ enabled: true }) });
                      }}
                      className="w-full h-14 bg-[#0075FF] text-white hover:bg-[#125eff] rounded-2xl font-black uppercase tracking-widest text-xs relative overflow-hidden group shadow-[0_15px_30px_rgba(0,117,255,0.2)]"
                    >
                      Verify & Synchronize
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
