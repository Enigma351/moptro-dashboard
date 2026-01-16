import ProfileImg from '@/assets/ProfilePicture.png';
import EditImg from '@/assets/Edit.png';
import { useNavigate, useLocation } from 'react-router-dom';

type User = {
  id?: string;
  name?: string;
  email?: string;
};

function Tab({ label, path }: { label: string; path: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
        active ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

export default function ProfileCard({ user }: { user: User }) {
  const name = user?.name ?? 'Guest User';
  const email = user?.email ?? '—';

  return (
    <div
      className="absolute flex items-center justify-between rounded-[20px] backdrop-blur"
      style={{
        top: '117px',
        left: '35px',
        width: '95%',
        height: '129px',
        padding: '24px',
        background: 'linear-gradient(94deg, #0B5ED7 0%, #0A0E237D 100%)',
      }}
    >
      {/* left */}
      <div className="flex items-center gap-4">
        <div className="relative w-[80px] h-[80px]">
          <img
            src={ProfileImg}
            alt="Profile"
            className="rounded-[20px] w-full h-full object-cover"
          />
          <img
            src={EditImg}
            alt="Edit"
            className="absolute bottom-[-6px] right-[-6px] w-[26px]"
          />
        </div>

        <div>
          <p className="text-lg font-bold leading-tight">{name}</p>
          <p className="text-sm text-white/60">{email}</p>
        </div>
      </div>

      {/* right */}
      <div className="flex gap-10">
        <Tab label="OVERVIEW" path="/dashboard" />
        <Tab label="TEAMS" path="/teams" />
        <Tab label="PROJECTS" path="/projects" />
      </div>
    </div>
  );
}
