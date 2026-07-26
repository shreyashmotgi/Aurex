import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

/**
 * Guards a subtree behind authentication. Wrap any route (or nested
 * route tree, e.g. "/dashboard/*") with this component.
 *
 * - Authenticated -> renders children as-is.
 * - Not authenticated -> redirects to /login, remembering where the
 *   user was headed so Login can send them back after signing in.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
