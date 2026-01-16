import { lazy, Suspense } from 'react';
import { useAuth } from '@/utils/useAuth';
import { Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('@/components/dashboard/Dashboard'));

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
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
        <div className="w-full h-screen flex items-center justify-center text-white">
          Loading dashboard UI…
        </div>
      }
    >
      <Dashboard user={user} />
    </Suspense>
  );
}
