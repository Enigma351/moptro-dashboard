import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import AuthNavbar from '@/components/layout/AuthNavbar';
import AuthFooter from '@/components/layout/AuthFooter';
import { useAuth } from '@/utils/useAuth';

import leftImage from '@/assets/MOPTro 1.png';

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!authLoading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Signup failed');
        return;
      }

      localStorage.setItem('token', data.token);

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
          {/* LEFT IMAGE */}
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

          {/* RIGHT SECTION */}
          <div className="flex-1 relative">
            <div
              className="absolute left-1/2 -translate-x-1/2 text-center"
              style={{ top: '218.75px', width: '333px' }}
            >
              <h2 className="text-[30px] font-bold">Welcome!</h2>
              <p className="mt-[6px] text-[14px] text-[#A0AEC0] leading-[24px]">
                Use these awesome forms to create a new account.
              </p>
            </div>

            <div
              className="absolute left-1/2 -translate-x-1/2 border-2 border-white rounded-[20px]"
              style={{
                top: '368px',
                width: '453px',
                height: '714px',
                backdropFilter: 'blur(42px)',
                background: 'rgba(148,163,184,0.18)',
              }}
            >
              <div className="px-[36px] pt-[44px]">
                <div className="mt-[20px] space-y-[24px]">
                  <Input
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm mt-4 text-center">
                    {error}
                  </p>
                )}

                <Button
                  className="w-[350px] h-[45px] mt-[45px]"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Signing up...' : 'SIGN UP'}
                </Button>

                <p className="text-center text-[14px] text-[#A0AEC0] mt-[22px]">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-white">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <div
              className="absolute left-1/2 -translate-x-1/2 w-[269px]"
              style={{ top: '1112px' }}
            >
              <AuthFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
