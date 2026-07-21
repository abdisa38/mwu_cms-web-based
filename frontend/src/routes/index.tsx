import { createBrowserRouter, Navigate } from 'react-router';
import { AuthGuard, GuestGuard } from '../guards/AuthGuard';
import { RoleGuard } from '../guards/RoleGuard';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Fallback pages (We'll implement actual pages in the next steps)
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 h-96 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">{title}</h1>
    <p className="text-slate-500">This module is under construction.</p>
  </div>
);

export const router = createBrowserRouter([
  // Public Routes (Accessible only by guests)
  {
    element: <GuestGuard />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: '/login', element: <PlaceholderPage title="Login to MWU e-Clearance" /> },
          { path: '/register', element: <PlaceholderPage title="Student Registration" /> },
          { path: '/forgot-password', element: <PlaceholderPage title="Forgot Password" /> },
        ]
      }
    ]
  },

  // Protected Routes
  {
    element: <AuthGuard />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          // Role: STUDENT
          {
            element: <RoleGuard allowedRoles={['STUDENT']} />,
            children: [
              { path: '/student/dashboard', element: <PlaceholderPage title="Student Dashboard" /> },
              { path: '/student/clearance', element: <PlaceholderPage title="My Clearance" /> },
              { path: '/student/documents', element: <PlaceholderPage title="Document Center" /> },
              { path: '/student/appeals', element: <PlaceholderPage title="Appeal Center" /> },
            ]
          },
          
          // Role: OFFICER (Department/Library/Sports etc)
          {
            element: <RoleGuard allowedRoles={['OFFICER']} />,
            children: [
              { path: '/officer/dashboard', element: <PlaceholderPage title="Officer Dashboard" /> },
              { path: '/officer/queue', element: <PlaceholderPage title="Clearance Queue" /> },
            ]
          },

          // Role: REGISTRAR
          {
            element: <RoleGuard allowedRoles={['REGISTRAR']} />,
            children: [
              { path: '/registrar/dashboard', element: <PlaceholderPage title="Registrar Dashboard" /> },
              { path: '/registrar/certificates', element: <PlaceholderPage title="Certificate Management" /> },
              { path: '/registrar/students', element: <PlaceholderPage title="Student Database" /> },
            ]
          },

          // Role: ADMIN
          {
            element: <RoleGuard allowedRoles={['ADMIN']} />,
            children: [
              { path: '/admin/dashboard', element: <PlaceholderPage title="Admin Dashboard" /> },
              { path: '/admin/settings', element: <PlaceholderPage title="System Settings" /> },
              { path: '/admin/audit', element: <PlaceholderPage title="Audit Logs" /> },
            ]
          },
          
          // Shared Protected Routes
          { path: '/settings/profile', element: <PlaceholderPage title="My Profile" /> },
          { path: '/messages', element: <PlaceholderPage title="Messages Center" /> },
          { path: '/notifications', element: <PlaceholderPage title="Notifications" /> },
        ]
      }
    ]
  },

  // Catch-all 404 & Unauthorized
  { path: '/unauthorized', element: <PlaceholderPage title="403 - Unauthorized Access" /> },
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '*', element: <PlaceholderPage title="404 - Page Not Found" /> },
]);
