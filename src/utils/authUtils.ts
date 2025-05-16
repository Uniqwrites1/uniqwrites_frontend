import { UserRole } from "../context/AuthContext";

/**
 * Get the appropriate dashboard URL for the given user role
 */
export const getDashboardUrl = (role?: UserRole | null): string => {
  if (!role) return '/';

  switch (role) {
    case 'teacher':
      return '/teacher/dashboard';
    case 'parent':
      return '/parent/dashboard';
    case 'school':
      return '/school/dashboard';
    case 'admin':
      return '/admin/dashboard';
    default:
      return '/';
  }
};

/**
 * Determine if a user has access to a specific route based on their role
 * @param userRole - The user's role
 * @param requiredRoles - Array of roles allowed to access the route
 * @returns boolean indicating if the user has access
 */
export const hasRouteAccess = (
  userRole?: UserRole | null,
  requiredRoles: UserRole[] = []
): boolean => {
  if (!userRole) return false;
  if (requiredRoles.length === 0) return true;
  
  return requiredRoles.includes(userRole);
};
