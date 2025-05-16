import { useContext } from 'react';
import { AuthContext, UserRole } from '../context/AuthContext';

// Main auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Additional auth-related utility hooks
export const useUserRole = (): UserRole => {
  const { user } = useAuth();
  return user?.role ?? null;
};

// Check if user is authenticated
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

// Get user profile data
export const useUserProfile = () => {
  const { user } = useAuth();
  return user?.profile ?? null;
};

// Check if a specific role is allowed
export const useHasRole = (allowedRoles: UserRole[]): boolean => {
  const role = useUserRole();
  return role !== null && allowedRoles.includes(role);
};

// Check if the current user can access a route
export const useCanAccessRoute = (requiredRoles: UserRole[]): boolean => {
  const { isAuthenticated } = useAuth();
  const role = useUserRole();
  
  if (!isAuthenticated || role === null) {
    return false;
  }
  
  // If no roles are required, any authenticated user can access
  if (requiredRoles.length === 0) {
    return true;
  }
  
  return requiredRoles.includes(role);
};
