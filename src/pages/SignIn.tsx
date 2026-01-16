import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthNavbar from '@/components/layout/AuthNavbar';
import AuthFooter from '@/components/layout/AuthFooter';
import { useAuth } from '@/utils/useAuth';

import leftImage from '@/assets/MOPTro 1.png';

const API_URL = import.meta.env.VITE_API_URL;

export default function SignIn() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* logcheck */
  if (!authLoading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid credentials');
        return;
      }

      // token
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('token', data.token);

      navigate('/dashboard', { replace: true });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen flex justify-center bg-black text-white">
      <div
        className="relative w-[1920px] h-[1300px] overflow-hidden"
        style={{
          background:
            'linear-gradient(164deg, #0F123B 0%, #090D2E 59%, #020515 100%)',
        }}
      >
        <AuthNavbar />

        <div className="flex h-full">
          
          <div
            className="relative"
            style={{
              width: '50%',
              height: '1300px',
              background: `url(${leftImage}) no-repeat`,
            }}
          >
            <div
              className="absolute left-[520px] -translate-x-1/2 text-center"
              style={{ top: '612px', width: '363px' }}
            >
              <p className="text-[20px] tracking-[3.6px]">
                INSPIRED BY THE FUTURE:
              </p>
              <p className="mt-[6px] text-[36px] font-bold tracking-[6.48px]">
                MOPTrO
              </p>
            </div>
          </div>

          
          <div className="flex-1 relative">
            <form
              className="w-[350px] absolute left-1/2 -translate-x-1/2 top-[449px]"
              onSubmit={handleSubmit}
            >
              <h2 className="text-[30px] font-bold">Nice to see you!</h2>

              <p className="text-[14px] text-[#A0AEC0] mt-[6px]">
                Enter your email and password to sign in
              </p>

              <div className="mt-[45px]">
                <label className="block text-[14px] ml-3">Email</label>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-[18px]">
                <label className="block text-[14px] ml-3">Password</label>
                <Input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-[10px] mt-[16px]">
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className={`relative w-[36px] h-[18px] rounded-full ${
                    remember ? 'bg-[#0075FF]' : 'bg-gray-400'
                  }`}
                >
                  <span
                    className={`absolute top-[2px] left-[2px]
                    w-[14px] h-[14px] bg-white rounded-full transition-transform
                    ${remember ? 'translate-x-[18px]' : ''}`}
                  />
                </button>
                <span className="text-[14px] text-white/70">
                  Remember me
                </span>
              </div>

              {error && (
                <p className="text-red-400 text-sm mt-3 text-center">
                  {error}
                </p>
              )}

              <Button
                className="w-[350px] h-[45px] mt-[38.46px]"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'SIGN IN'}
              </Button>

              <div className="flex justify-center mt-[14px]">
                <p className="text-[14px] text-[#A0AEC0]">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="text-white">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>

            <div
              className="absolute left-1/2 -translate-x-1/2 w-[269px]"
              style={{ top: '1036.75px' }}
            >
              <AuthFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
