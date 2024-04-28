import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Loading from "../pages/Loading";

const RequireAuth = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Delay rendering until the API call is completed
  if (isLoading) {
    return <Loading />;
  }

  // Check if the user's role is included in the allowedRoles array
  const isAllowed = allowedRoles?.includes(user);

  // Redirect logic based on user's role and authentication status
  return isAllowed ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;