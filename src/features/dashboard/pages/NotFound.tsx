import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020515] text-white p-6 text-center">
      <div>
        <h1 className="text-9xl font-bold text-[#0075FF]">404</h1>
        <p className="text-xl sm:text-2xl mt-4 text-white/70">Oops! Page not found.</p>
        <Link 
          to="/dashboard"
          className="mt-8 inline-block px-8 py-3 bg-[#0075FF] rounded-xl font-bold hover:bg-[#0061d1] transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
