import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the right role for this route
    // Kick them back to their appropriate dashboard based on their role
    const fallbackRoute = user.role === 'STUDENT' ? '/student' : 
                          user.role === 'REGISTRAR' ? '/registrar' : '/officer';
    return <Navigate to={fallbackRoute} replace />;
  }

  return <Outlet />;
};
