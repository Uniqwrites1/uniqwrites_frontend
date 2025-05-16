import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../context/AuthContext';
import { hasRouteAccess } from '../../utils/authUtils';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
    if (!isAuthenticated) {
    // Redirect to auth page but save the attempted location
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  
  // If authenticated but role check required and role doesn't match
  if (!hasRouteAccess(user?.role, allowedRoles)) {
    // Redirect to unauthorized page with info about the current user role
    return <Navigate to="/unauthorized" state={{ 
      attemptedRoute: location.pathname,
      currentRole: user?.role 
    }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;