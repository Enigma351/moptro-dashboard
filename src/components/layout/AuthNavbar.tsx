import { NavLink } from 'react-router-dom';

import dashboardIcon from '@/assets/Icon.png';
import profileIcon from '@/assets/Profile.png';
import signupIcon from '@/assets/Signup.png';
import signinIcon from '@/assets/Signin.png';

export default function AuthNavbar() {
  return (
    <nav
      className="
        absolute top-[24px] left-1/2 -translate-x-1/2 z-50
        w-[650px] h-[70px]
        flex items-center justify-center gap-10
        rounded-[20px] border-2 border-white text-[11px] text-white
      "
      style={{
        backdropFilter: 'blur(42px)',
        WebkitBackdropFilter: 'blur(42px)',
      }}
    >
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-2 ${
            isActive ? 'text-white' : 'text-white/70'
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
          `flex items-center gap-2 ${
            isActive ? 'text-white' : 'text-white/70'
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
          `flex items-center gap-2 ${
            isActive ? 'text-white' : 'text-white/70'
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
          `flex items-center gap-2 ${
            isActive ? 'text-white' : 'text-white/70'
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
    </nav>
  );
}
