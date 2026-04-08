import { useState, useMemo } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Check, X as CloseIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';

import AuthNavbar from '@/features/auth/components/AuthNavbar';
import AuthFooter from '@/features/auth/components/AuthFooter';
import { useAuth } from '@/hooks/useAuth';
import { apiFetch } from '@/services/apiClient';
import { cn } from '@/lib/utils';

const leftImage = 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop';

export default function SignUp() {
  const navigate = useNavigate();
  const { user, loading: authLoading, login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = useMemo(() => [
    { label: 'Minimum 8 characters', met: password.length >= 8 },
    { label: 'At least one number', met: /\d/.test(password) },
    { label: 'At least one special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ], [password]);

  const strengthScore = useMemo(() => {
    return passwordRequirements.filter(req => req.met).length;
  }, [passwordRequirements]);

  const strengthColor = useMemo(() => {
    if (strengthScore === 0) return 'bg-white/10';
    if (strengthScore === 1) return 'bg-red-500';
    if (strengthScore === 2) return 'bg-yellow-500';
    return 'bg-[#01b574]';
  }, [strengthScore]);

  if (!authLoading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const isFormValid = Boolean(name.trim() && email.trim() && strengthScore === 3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError('');
    setLoading(true);

    try {
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password: password.trim() }),
      });

      await login();
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      if (err.status === 400) {
        setError('Registration failed. The provided details are invalid or the account already exists.');
      } else if (err.status === 429) {
        setError('Security Notice: Too many registration attempts. Please try again later.');
      } else if (err.status >= 500) {
        setError('System error: Registration services are currently undergoing maintenance.');
      } else {
        setError(err.message || 'An unexpected error occurred during account initialization.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020515] text-white relative overflow-hidden">
      {/* Animated Aurora Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
            opacity: [0.15, 0.3, 0.15] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#1e3a8a]/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, -40, 0],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#0075FF]/10 blur-[100px]"
        />
      </div>

      <div className="relative flex-1 flex flex-col overflow-x-hidden overflow-y-auto bg-gradient-main z-10">
        <AuthNavbar />

        <div className="flex flex-col lg:flex-row flex-1 pt-12 sm:pt-32 pb-10 px-4 sm:px-10 max-w-[1600px] mx-auto w-full gap-10 items-center">
          {/* LEFT SIDE - Info (visible on large screens) */}
           <div className="hidden lg:flex flex-1 relative rounded-[40px] overflow-hidden min-h-[600px] shadow-3xl border border-white/10 group">
              <div 
                className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${leftImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020515] via-transparent to-transparent opacity-90" />
              
              <div className="relative mt-auto z-10 p-16 w-full text-left">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography variant="small" className="text-[#0075FF] mb-4 font-black tracking-[4px]">JOIN THE REVOLUTION</Typography>
                  <Typography variant="h1" className="text-white drop-shadow-2xl text-6xl leading-tight">
                    Experience <br/> <span className="text-white/40">Pure Intelligence</span>
                  </Typography>
                </motion.div>
              </div>
           </div>

          {/* RIGHT SIDE - Form */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg lg:max-w-md animate-in fade-in slide-in-from-bottom-5 duration-700">
            <Card variant="glass" className="w-full p-8 sm:p-12 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-3xl">
              <Typography variant="h2" className="mb-4 text-3xl sm:text-4xl">Create Account</Typography>
              <Typography variant="p" className="mb-10 text-white/50 text-xs sm:text-sm leading-relaxed">
                Be part of our exclusive enterprise network. Initialize your profile to begin fleet synchronization with MOPTrO.
              </Typography>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Typography variant="small" className="ml-1">Full Name</Typography>
                  <Input
                    placeholder="John Doe"
                    autoComplete="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-2 focus:ring-[#0075FF] transition-all"
                  />
                </div>

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

                <div className="space-y-3">
                  <Typography variant="small" className="ml-1">Password</Typography>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="new-password"
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

                  {/* Password Strength Indicator */}
                  <div className="flex gap-2 h-1.5 px-1 mt-3">
                    {[1, 2, 3].map((step) => (
                      <div 
                        key={step} 
                        className={cn(
                          "flex-1 rounded-full transition-all duration-500",
                          strengthScore >= step ? strengthColor : "bg-white/5"
                        )} 
                      />
                    ))}
                  </div>

                  {/* Requirements List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 px-1">
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {req.met ? (
                          <Check size={12} className="text-[#01b574]" />
                        ) : (
                          <CloseIcon size={12} className="text-white/20" />
                        )}
                        <span className={cn(
                          "text-[9px] uppercase font-bold tracking-wider transition-colors",
                          req.met ? "text-white/80" : "text-white/20"
                        )}>
                          {req.label}
                        </span>
                      </div>
                    ))}
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
                  className="w-full h-14 rounded-2xl bg-[#0075FF] hover:bg-blue-600 font-bold text-sm tracking-[2px] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_20px_rgba(0,117,255,0.3)] disabled:opacity-20 disabled:grayscale disabled:scale-100"
                  disabled={loading || !isFormValid}
                >
                  {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                  {loading ? 'INITIALIZING...' : 'GET STARTED'}
                </Button>

                <div className="text-center pt-6">
                  <Typography variant="muted">
                    ALREADY HAVE AN ACCOUNT?{' '}
                    <Link to="/signin" className="text-white font-bold hover:text-[#0075FF] transition-colors border-b border-white/20 ml-2">
                      SIGN IN
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
