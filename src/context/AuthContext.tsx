import React, { createContext, useState, useEffect } from 'react';
import { ApiService } from '../services/apiService';
import { LoggingService } from '../services/loggingService';
import { ErrorHandler } from '../utils/errorHandler';

// Define user roles with more specificity
export type UserRole = 'teacher' | 'parent' | 'school' | 'admin' | null;

// Profile interface
export interface UserProfile {
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
}

// Enhanced User Interface
export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile?: UserProfile;
}

// Signup Data Interface
export interface SignupData {
  email: string;
  password: string;
  role: UserRole;
  profile?: UserProfile;
}

// Authentication Context Interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  loginWithGoogle: (role: UserRole) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Log user identification for tracking
          LoggingService.setUser({
            id: parsedUser.id,
            email: parsedUser.email,
            role: parsedUser.role ?? undefined
          });
        }
      } catch (error) {
        // Clear invalid stored user
        localStorage.removeItem('user');
        ErrorHandler.logError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Use API Service for login
      const loginResponse = await ApiService.login(email, password, role ?? 'unknown');
      
      const userData: User = {
        id: loginResponse.user.id,
        email: loginResponse.user.email,
        role: role,
        profile: loginResponse.user.profile
      };

      setUser(userData);
      setIsAuthenticated(true);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Log login event
      LoggingService.trackEvent('user_login', { role: role ?? 'unknown' });
      LoggingService.setUser({
        id: userData.id,
        email: userData.email,
        role: userData.role ?? undefined
      });
    } catch (error) {
      // Log login failure
      LoggingService.error(error as Error, { 
        context: 'user_login_attempt', 
        email 
      });
      
      // Rethrow to be handled by caller
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      // Use API Service for signup
      const signupResponse = await ApiService.signup({
        ...userData,
        role: userData.role ?? 'unknown'
      });
      
      const userDetails: User = {
        id: signupResponse.user.id,
        email: signupResponse.user.email,
        role: userData.role,
        profile: userData.profile || signupResponse.user.profile
      };

      setUser(userDetails);
      setIsAuthenticated(true);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userDetails));
      
      // Log signup event
      LoggingService.trackEvent('user_signup', { role: userData.role ?? 'unknown' });
      LoggingService.setUser({
        id: userDetails.id,
        email: userDetails.email,
        role: userDetails.role ?? undefined
      });
    } catch (error) {
      // Log signup failure
      LoggingService.error(error as Error, { 
        context: 'user_signup_attempt', 
        email: userData.email 
      });
      
      // Rethrow to be handled by caller
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate or integrate actual Google login
      const googleResponse = await ApiService.login(
        `${role ?? 'unknown'}_${Date.now()}@gmail.com`, 
        'google_token', 
        role ?? 'unknown'
      );
      
      const userData: User = {
        id: googleResponse.user.id,
        email: googleResponse.user.email,
        role: role,
        profile: {
          firstName: 'Google User'
        }
      };

      setUser(userData);
      setIsAuthenticated(true);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Log Google login event
      LoggingService.trackEvent('user_google_login', { role: role ?? 'unknown' });
      LoggingService.setUser({
        id: userData.id,
        email: userData.email,
        role: userData.role ?? undefined
      });
    } catch (error) {
      // Log Google login failure
      LoggingService.error(error as Error, { 
        context: 'user_google_login_attempt', 
        role 
      });
      
      // Rethrow to be handled by caller
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Log logout event
    LoggingService.trackEvent('user_logout', { 
      role: user?.role ?? 'unknown'
    });

    // Clear user data
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    
    // Clear user context in logging
    LoggingService.clearUser();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      signup, 
      logout, 
      loginWithGoogle 
    }}>
      {children}
    </AuthContext.Provider>
  );
};