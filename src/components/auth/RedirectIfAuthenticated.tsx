import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getDashboardUrl } from '../../utils/authUtils';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
}

/**
 * Component that redirects users to their appropriate dashboard
 * if they're already authenticated
 */
const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProps> = ({ 
  children 
}) => {
  const { isAuthenticated, user } = useAuth();
  // If user is authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    // Use the utility function to get the appropriate dashboard URL
    const dashboardUrl = getDashboardUrl(user.role);
    return <Navigate to={dashboardUrl} replace />;
  }

  // Otherwise, render children
  return <>{children}</>;
};

export default RedirectIfAuthenticated;
