import { lazy, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../components/Dashboard'));

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center px-4 text-white text-sm sm:text-base">
        Loading dashboard…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center px-4 text-white text-sm sm:text-base">
          Loading dashboard UI…
        </div>
      }
    >
      <Dashboard user={user} />
    </Suspense>
  );
}
