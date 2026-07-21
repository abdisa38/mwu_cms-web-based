import { Navigate, Outlet, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const AuthGuard = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const GuestGuard = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    // Redirect based on role if they are already logged in but trying to hit /login
    const rolePath = user?.role.toLowerCase() || 'student';
    return <Navigate to={`/${rolePath}/dashboard`} replace />;
  }

  return <Outlet />;
};
