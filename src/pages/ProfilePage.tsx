import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import { logout } from '@/utils/auth';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/utils/useAuth';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  /* sync once */
  if (!loading && user && name === '') {
    setName(user.name);
    setEmail(user.email);
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Loading profile…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white">
      <Sidebar />

      <main className="ml-[294px] p-8 space-y-8">

        
        <div className="flex items-center justify-between bg-white/10 backdrop-blur rounded-2xl p-6">
          <div className="flex items-center gap-5">
            <div className="w-[72px] h-[72px] rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold">
              {name.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-sm text-white/60">{email}</p>
              <span className="inline-block mt-1 px-3 py-[2px] text-xs rounded-full bg-green-500/30">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setEditMode(!editMode)}
              className="bg-white/10"
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                logout();
                navigate('/signin');
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        
        <div className="grid grid-cols-4 gap-6">
          <Stat label="Account Type" value="Standard" />
          <Stat label="Role" value="User" />
          <Stat label="Status" value="Active" />
          <Stat label="Member Since" value="2024" />
        </div>

        
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">
              Personal Information
            </h3>

            <Field
              label="Full Name"
              value={name}
              editable={editMode}
              onChange={setName}
            />

            <Field
              label="Email"
              value={email}
              editable={false}
            />

            {editMode && (
              <div className="mt-6 flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
                <Button
                  className="bg-white/10"
                  onClick={() => {
                    setName(user.name);
                    setEmail(user.email);
                    setEditMode(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            )}
          </Card>

          
          <Card>
            <h3 className="text-lg font-semibold mb-4">
              Recent Activity
            </h3>

            <ul className="space-y-3 text-sm text-white/80">
              <li>✔ Logged in — just now</li>
              <li>✔ Viewed dashboard</li>
              <li>✔ Updated profile</li>
              <li>✔ Signed out yesterday</li>
            </ul>
          </Card>
        </div>

      </main>
    </div>
  );
}



function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-4">
      <p className="text-xs text-white/60">{label}</p>
      <p className="text-lg font-bold mt-1">{value}</p>
    </div>
  );
}

function Field({
  label,
  value,
  editable,
  onChange,
}: {
  label: string;
  value: string;
  editable: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="mb-4">
      <p className="text-xs uppercase tracking-widest text-white/50">
        {label}
      </p>
      {editable ? (
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="mt-2 w-full bg-black/30 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className="mt-2 font-semibold">{value}</p>
      )}
    </div>
  );
}
