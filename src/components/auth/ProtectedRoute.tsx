import { Navigate } from 'react-router-dom';
import { useAuth } from '@/utils/useAuth';
import type { ReactNode } from 'react';

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
