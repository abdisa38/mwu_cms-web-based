import { createBrowserRouter, Navigate } from 'react-router';
import { AuthGuard, GuestGuard } from '../guards/AuthGuard';
import { RoleGuard } from '../guards/RoleGuard';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Auth Pages
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage';
import { EmailVerificationPage } from '../features/auth/pages/EmailVerificationPage';

// Student Pages
import { StudentDashboard } from '../features/student/pages/StudentDashboard';
import { MyClearancePage } from '../features/student/pages/MyClearancePage';
import { StartClearancePage } from '../features/student/pages/StartClearancePage';
import { ClearanceDetailsPage } from '../features/student/pages/ClearanceDetailsPage';
import { StudentDocumentsPage } from '../features/student/pages/StudentDocumentsPage';
import { StudentCertificatesPage } from '../features/student/pages/StudentCertificatesPage';
import { StudentProfilePage } from '../features/student/pages/StudentProfilePage';
import { StudentSettingsPage } from '../features/student/pages/StudentSettingsPage';

// Communication Pages
import { NotificationsPage } from '../features/communication/pages/NotificationsPage';
import { MessagesPage } from '../features/communication/pages/MessagesPage';

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
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password/:token', element: <ResetPasswordPage /> },
      { path: '/verify-email/:token', element: <EmailVerificationPage /> },
    ]
  },

  // Protected Routes
  {
    element: <AuthGuard />,
    children: [
      // Common authenticated routes (e.g., profile, settings)
      {
        element: <DashboardLayout />,
        children: [
          { path: '/profile', element: <StudentProfilePage /> }, // We'll make this generic later
          { path: '/settings', element: <StudentSettingsPage /> },
          { path: '/notifications', element: <NotificationsPage /> },
          { path: '/messages', element: <MessagesPage /> },
        ]
      },

      // Student Routes
      {
        path: '/student',
        element: <RoleGuard allowedRoles={['STUDENT']} />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: 'dashboard', element: <StudentDashboard /> },
              { path: 'clearances', element: <MyClearancePage /> },
              { path: 'clearance/new', element: <StartClearancePage /> },
              { path: 'clearance/:id', element: <ClearanceDetailsPage /> },
              { path: 'documents', element: <StudentDocumentsPage /> },
              { path: 'certificates', element: <StudentCertificatesPage /> },
            ]
          }
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
