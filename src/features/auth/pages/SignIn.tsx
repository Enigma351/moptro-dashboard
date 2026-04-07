import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import AuthNavbar from '@/features/auth/components/AuthNavbar';
import AuthFooter from '@/features/auth/components/AuthFooter';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/services/apiClient';

const leftImage = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop';

export default function SignIn() {
  const navigate = useNavigate();
  const { user, loading: authLoading, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!authLoading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiFetch('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      await login();
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      if (err.status === 401) {
        setError('Authentication failed. Please verify your credentials and try again.');
      } else if (err.status === 429) {
        setError('Security Notice: Too many login attempts. Access has been temporarily restricted for your protection.');
      } else if (err.status >= 500) {
        setError('System error: We are experiencing technical difficulties with the authentication server.');
      } else {
        setError(err.message || 'An unexpected error occurred. Laboratory technician has been notified.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020515] text-white">
      <div className="relative flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-gradient-main">
        <AuthNavbar />

        <div className="flex flex-col lg:flex-row flex-1 pt-24 sm:pt-32 pb-10 px-4 sm:px-10 max-w-[1600px] mx-auto w-full gap-10 items-center">
          {/* LEFT SIDE - Info (visible on large screens) */}
          <div className="hidden lg:flex flex-1 relative rounded-[40px] overflow-hidden min-h-[600px] shadow-2xl border border-white/10 group">
             <div 
               className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
               style={{ backgroundImage: `url(${leftImage})` }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020515] via-transparent to-transparent opacity-90" />
             
             <div className="relative mt-auto z-10 p-16 w-full text-left">
               <Typography variant="small" className="text-[#0075FF] mb-4">Automating the Future</Typography>
               <Typography variant="h1" className="text-white drop-shadow-2xl">
                 Smart Dashboard <br/> <span className="text-white/40">for MOPTrO</span>
               </Typography>
             </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg lg:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-700">
            <Card variant="glass" className="w-full p-8 sm:p-12">
              <Typography variant="h2" className="mb-4">Welcome Back</Typography>
              <Typography variant="p" className="mb-10 text-white/50">
                Unlock the full potential of your vehicle. Sign in to your MOPTrO account.
              </Typography>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Typography variant="small" className="ml-1">Email Address</Typography>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-[#0075FF] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Typography variant="small" className="ml-1">Password</Typography>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl pl-6 pr-12 focus:ring-2 focus:ring-[#0075FF] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setRemember(!remember)}>
                    <div className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                      remember ? 'bg-[#0075FF]' : 'bg-white/10'
                    }`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        remember ? 'translate-x-5' : ''
                      }`} />
                    </div>
                    <Typography variant="small" className="text-white/60 group-hover:text-white transition-colors">REMEMBER ME</Typography>
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", repeat: 2, duration: 0.2 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                  >
                    <p className="text-red-400 text-[10px] font-black text-center uppercase tracking-widest leading-relaxed">
                      {error}
                    </p>
                  </motion.div>
                )}

                <Button
                  className="w-full h-14 rounded-2xl bg-[#0075FF] hover:bg-blue-600 font-bold text-sm tracking-[2px] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_20px_rgba(0,117,255,0.3)] disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                  {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
                </Button>

                <div className="text-center pt-6">
                  <Typography variant="muted">
                    NEW TO MOPTRO?{' '}
                    <Link to="/signup" className="text-white font-bold hover:text-[#0075FF] transition-colors border-b border-white/20 ml-2">
                       CREATE ACCOUNT
                    </Link>
                  </Typography>
                </div>
              </form>
            </Card>
          </div>
        </div>

        <div className="py-10">
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
