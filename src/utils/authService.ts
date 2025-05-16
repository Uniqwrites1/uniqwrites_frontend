import { User, UserRole } from '../context/AuthContext';
import { getDashboardUrl } from './authUtils';
import { LoggingService } from '../services/loggingService';

/**
 * Authentication utility class with helper methods for common auth operations
 */
export class AuthUtils {
  /**
   * Get the current authenticated user from local storage
   */
  static getCurrentUser(): User | null {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) return null;
      
      return JSON.parse(userString);
    } catch (error) {
      LoggingService.error(error as Error, { context: 'getCurrentUser' });
      return null;
    }
  }

  /**
   * Check if the user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getCurrentUser() && !!localStorage.getItem('token');
  }

  /**
   * Get the current user's role
   */
  static getCurrentUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }

  /**
   * Check if the current user has a specific role
   */
  static hasRole(role: UserRole | UserRole[]): boolean {
    const currentRole = this.getCurrentUserRole();
    if (!currentRole) return false;
    
    if (Array.isArray(role)) {
      return role.includes(currentRole);
    }
    
    return currentRole === role;
  }

  /**
   * Get the appropriate redirect URL based on the user's role
   */
  static getRedirectUrl(defaultUrl: string = '/'): string {
    const role = this.getCurrentUserRole();
    return role ? getDashboardUrl(role) : defaultUrl;
  }
  
  /**
   * Clear authentication data from local storage
   */
  static clearAuthData(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

export default AuthUtils;
