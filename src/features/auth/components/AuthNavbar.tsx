import { NavLink } from 'react-router-dom';

import dashboardIcon from '@/assets/Icon.png';
import profileIcon from '@/assets/Profile.png';
import signupIcon from '@/assets/Signup.png';
import signinIcon from '@/assets/Signin.png';

export default function AuthNavbar() {
  return (
    <nav
      className="
        fixed top-[24px] left-1/2 -translate-x-1/2 z-50
        w-[95%] max-w-[800px] min-h-[50px] sm:h-[64px]
        hidden lg:flex items-center justify-between px-6 sm:px-10
        rounded-[20px] border border-white/20 text-[10px] sm:text-[12px] font-bold text-white
        bg-white/5 backdrop-blur-[20px] shadow-[0_4px_30px_rgba(0,0,0,0.1)]
      "
    >
      <div className="flex items-center gap-2">
        <span className="tracking-[4px] text-white">MOPTrO</span>
      </div>

      <div className="flex items-center gap-6 sm:gap-10">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-2 transition-colors ${
            isActive ? 'text-white' : 'text-white/70 hover:text-white'
          }`
        }
      >
        <img
          src={dashboardIcon}
          alt="Dashboard"
          className="w-[11px] h-[11px]"
        />
        DASHBOARD
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex items-center gap-2 transition-colors ${
            isActive ? 'text-white' : 'text-white/70 hover:text-white'
          }`
        }
      >
        <img
          src={profileIcon}
          alt="Profile"
          className="w-[11px] h-[11px]"
        />
        PROFILE
      </NavLink>

      <NavLink
        to="/signup"
        className={({ isActive }) =>
          `flex items-center gap-2 transition-colors ${
            isActive ? 'text-white' : 'text-white/70 hover:text-white'
          }`
        }
      >
        <img
          src={signupIcon}
          alt="Sign Up"
          className="w-[11px] h-[11px]"
        />
        SIGNUP
      </NavLink>

      <NavLink
        to="/signin"
        className={({ isActive }) =>
          `flex items-center gap-2 transition-colors ${
            isActive ? 'text-white' : 'text-white/70 hover:text-white'
          }`
        }
      >
        <img
          src={signinIcon}
          alt="Sign In"
          className="w-[11px] h-[11px]"
        />
        SIGNIN
      </NavLink>
      </div>
    </nav>
  );
}
