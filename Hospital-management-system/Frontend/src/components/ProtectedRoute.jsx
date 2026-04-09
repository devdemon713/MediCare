import { Navigate, useLocation } from "react-router-dom";

/**
 * BetterLife Security Gateway
 * Protects routes based on JWT presence and hierarchical roles.
 */
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // 1. Session Check
  // If no token exists, redirect to login but save the current location 
  // so we can send them back after they log in.
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Authorization Check
  // If a specific role is required:
  if (allowedRole) {
    const hasAccess = Array.isArray(allowedRole) 
      ? allowedRole.includes(role) 
      : role === allowedRole;

    // Optional: Admins usually bypass role restrictions
    const isAdmin = role === "admin";

    if (!hasAccess && !isAdmin) {
      console.warn(`[Security] Unauthorized access attempt to ${location.pathname}`);
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // 3. Access Granted
  // Wrap children in a small motion div for a smooth entrance transition
  return children;
}

export default ProtectedRoute;