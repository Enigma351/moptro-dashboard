import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

/* Auth Feature */
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import PublicRoute from '@/features/auth/components/PublicRoute';
const SignIn = lazy(() => import('@/features/auth/pages/SignIn'));
const SignUp = lazy(() => import('@/features/auth/pages/SignUp'));

/* Dashboard Feature */
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const ProfilePage = lazy(() => import('@/features/dashboard/pages/ProfilePage'));
const TablesPage = lazy(() => import('@/features/dashboard/pages/TablesPage'));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const BillingPage = lazy(() => import('@/features/billing/pages/BillingPage'));
const ProductDetailsPage = lazy(() => import('@/features/products/pages/ProductDetailsPage'));
const NotFound = lazy(() => import('@/features/dashboard/pages/NotFound'));

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading…</div>}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/telemetrics" element={<TablesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Route>

          {/* Root/Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
