import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../context/AuthContext';
import { getDashboardUrl, hasRouteAccess } from '../utils/authUtils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

/**
 * Dashboard Layout Component - Provides consistent layout for dashboard pages
 * with authentication and role-based access control
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  // Redirect to authentication page if user is not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" />;
  }  // Redirect to appropriate dashboard if user doesn't have the required role
  if (!hasRouteAccess(user.role, [requiredRole])) {
    // Use the utility function to determine where to redirect the user
    return <Navigate to={getDashboardUrl(user.role)} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
