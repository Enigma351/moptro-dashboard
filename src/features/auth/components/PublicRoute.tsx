import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Checking session...
      </div>
    );
  }

  // login check
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
