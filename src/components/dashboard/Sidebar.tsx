import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/utils/useAuth';
import {
  LayoutGrid,
  Table2,
  User,
  LogIn,
  UserPlus,
  ArrowLeft,
} from 'lucide-react';

function SidebarItem({
  label,
  top,
  icon: Icon,
  path,
}: {
  label: string;
  top: string;
  icon: any;
  path: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`absolute left-[20px] w-[220px] h-[54px] flex items-center rounded-[15px] cursor-pointer transition ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-white/70 hover:bg-white/5'
      }`}
      style={{ top }}
    >
      <div className="ml-[16px] w-[16px] h-[16px] flex items-center justify-center">
        <Icon size={16} />
      </div>
      <span className="ml-[20px]">{label}</span>
    </div>
  );
}

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const showBack =
    location.pathname !== '/dashboard' &&
    location.pathname !== '/profile';

  return (
    <aside
      className="absolute rounded-[20px] overflow-hidden"
      style={{
        top: '10px',
        left: '10px',
        width: '264px',
        height: '1135px',
        backdropFilter: 'blur(50px)',
      }}
    >
      
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #03081A 0%, #050F2D 45%, #0B2A6F 100%)',
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_45px_rgba(0,0,0,0.6)]" />

      <div className="relative z-10">
        
        {user && showBack && (
          <div
            onClick={() => navigate(-1)}
            className="absolute top-[-10px] left-[20px] w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <ArrowLeft size={18} />
          </div>
        )}

        <p className="text-center mt-10 tracking-[2.5px] text-sm">
          MOPTrO
        </p>

        {/* logged in*/}
        {user && (
          <>
            <SidebarItem
              top="126px"
              label="Dashboard"
              icon={LayoutGrid}
              path="/dashboard"
            />

            <SidebarItem
              top="188px"
              label="Tables"
              icon={Table2}
              path="/tables"
            />

            <p className="absolute top-[344px] left-[38px] text-xs text-white/60">
              ACCOUNT PAGES
            </p>

            <SidebarItem
              top="390px"
              label="Profile"
              icon={User}
              path="/profile"
            />
          </>
        )}

        {/* logged out */}
        {!user && (
          <>
            <SidebarItem
              top="390px"
              label="Sign In"
              icon={LogIn}
              path="/signin"
            />

            <SidebarItem
              top="444px"
              label="Sign Up"
              icon={UserPlus}
              path="/signup"
            />
          </>
        )}
      </div>
    </aside>
  );
}
