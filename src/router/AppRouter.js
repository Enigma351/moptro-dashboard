import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PublicRoute from '@/components/auth/PublicRoute';
import TablesPage from '@/pages/TablesPage';
import TeamsPage from '@/pages/dashboard/TeamsPage';
import ProjectsPage from '@/pages/dashboard/ProjectsPage';
export default function AppRouter() {
    return (_jsx(HashRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/signup", replace: true }) }), _jsx(Route, { path: "/signup", element: _jsx(PublicRoute, { children: _jsx(SignUp, {}) }) }), _jsx(Route, { path: "/signin", element: _jsx(PublicRoute, { children: _jsx(SignIn, {}) }) }), _jsx(Route, { path: "/dashboard/*", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }) }), _jsx(Route, { path: "/tables", element: _jsx(ProtectedRoute, { children: _jsx(TablesPage, {}) }) }), _jsx(Route, { path: "/teams", element: _jsx(ProtectedRoute, { children: _jsx(TeamsPage, {}) }) }), _jsx(Route, { path: "/projects", element: _jsx(ProtectedRoute, { children: _jsx(ProjectsPage, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/signup", replace: true }) })] }) }));
}
