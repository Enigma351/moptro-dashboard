import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { User, Shield, Activity, Calendar, Loader2 } from 'lucide-react';
import { apiFetch } from '@/services/apiClient';
import { Typography } from '@/components/ui/typography';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import StatsGrid from '../components/StatsGrid';
import { TimelineItem, ProfileField } from '../components/ProfileComponents';

export default function ProfilePage() {
  const { user, loading, logout, refreshProfile } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  /* sync once */
  if (!loading && user && !syncDone) {
    setName(user.name);
    setEmail(user.email);
    setSyncDone(true);
  }

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await apiFetch('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ name }),
      });
      await refreshProfile();
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Typography variant="small" className="animate-pulse tracking-[4px]">Fetching Identity…</Typography>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const stats = [
    { icon: Shield, label: "Access Level", value: "L1 Administrator" },
    { icon: Activity, label: "System Status", value: "Online" },
    { icon: User, label: "Fleet Role", value: "Lead Pilot" },
    { icon: Calendar, label: "Commenced", value: "JAN 2024" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-7xl mx-auto pb-20"
    >
        {/* ================= HEADER ================= */}
        <Card variant="glass" className="relative overflow-hidden p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0075FF]/10 blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-[32px] bg-gradient-to-br from-[#0075FF] to-[#125eff] flex items-center justify-center text-white text-5xl font-black shadow-[0_20px_40px_rgba(0,117,255,0.3)]"
              >
                {name.charAt(0).toUpperCase()}
              </motion.div>

              <div className="text-center sm:text-left">
                <Typography variant="h2">{name}</Typography>
                <Typography variant="p" className="mt-1 text-white/40">{email}</Typography>
                <div className="flex items-center gap-3 mt-5 justify-center sm:justify-start">
                  <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-[#01b57422] text-[#01b574] border border-[#01b57433]">
                    VERIFIED
                  </span>
                  <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full bg-[#0075FF22] text-[#0075FF] border border-[#0075FF33]">
                    ROOT ADMIN
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#01b574] animate-pulse ml-2" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <Button
                variant="outline"
                onClick={() => setEditMode(!editMode)}
                className="h-14 px-8 border border-white/10 rounded-2xl text-[12px] font-black uppercase tracking-[2px] hover:bg-white/5"
              >
                {editMode ? 'CANCEL' : 'EDIT IDENTITY'}
              </Button>

              <Button
                onClick={logout}
                className="h-14 px-8 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-2xl text-[12px] font-black uppercase tracking-[2px] transition-all"
              >
                TERMINATE SESSION
              </Button>
            </div>
          </div>
        </Card>

        {/* ================= STATS ================= */}
        <StatsGrid stats={stats} />

        {/* ================= INFO + ACTIVITY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardTitle>Personal Core Information</CardTitle>
            <CardContent className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ProfileField
                  label="Full Identity"
                  value={name}
                  editable={editMode}
                  onChange={setName}
                />
                <ProfileField
                  label="Network Address"
                  value={email}
                  editable={false}
                />
              </div>

              {editMode && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 flex gap-4"
                >
                  <Button 
                    disabled={updating}
                    onClick={handleUpdate}
                    className="h-14 px-10 bg-[#0075FF] hover:bg-blue-600 font-black text-[12px] tracking-[2px] rounded-2xl shadow-[0_10px_20px_rgba(0,117,255,0.3)] disabled:opacity-50"
                  >
                    {updating ? <Loader2 className="mr-2 animate-spin" size={16} /> : null}
                    {updating ? 'SYCHRONIZING...' : 'COMMIT CHANGES'}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 px-10 border border-white/10 rounded-2xl font-black text-[12px] tracking-[2px]"
                    onClick={() => {
                      setName(user.name);
                      setEmail(user.email);
                      setEditMode(false);
                    }}
                  >
                    RESET
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardTitle>Recent Telemetry</CardTitle>
            <CardContent className="mt-8">
              <ul className="space-y-6">
                <TimelineItem status="success" event="Secure Handshake Established" time="JUST NOW" />
                <TimelineItem status="default" event="Neural Link Synchronized" time="4 MIN AGO" />
                <TimelineItem status="default" event="Profile Vector Updated" time="12 MIN AGO" />
                <TimelineItem status="warning" event="Connection Protocol Encrypted" time="2 HOURS AGO" />
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* ================= DANGER ZONE ================= */}
        <div className="pt-4">
           <Card className="border border-red-500/20 bg-red-500/5 overflow-hidden">
             <div className="p-8 pb-4 flex items-center justify-between">
                <div>
                  <Typography variant="h3" className="text-red-400">Danger Zone</Typography>
                  <Typography variant="p" className="text-white/40 text-sm mt-1">Irreversible account actions and destructive operational protocols.</Typography>
                </div>
             </div>
             <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-white/5 bg-black/20 rounded-2xl gap-6">
                   <div>
                     <Typography variant="small" className="font-bold text-white block">Delete Identity Vector</Typography>
                     <Typography variant="small" className="text-white/40 mt-1 max-w-sm block">Permanently erase your account, all associated telemetry data, and fleet access controls.</Typography>
                   </div>
                   <Button variant="danger" className="shrink-0 h-12 px-6 rounded-xl text-xs uppercase tracking-wider font-bold">
                     Initiate Deletion
                   </Button>
                </div>
             </CardContent>
           </Card>
        </div>
    </motion.div>
  );
}
