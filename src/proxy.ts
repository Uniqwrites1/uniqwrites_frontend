/**
 * Proxy configuration helper for API requests
 * This file helps manage API endpoints and handles proxy configuration
 */

// Base API URL from environment or default to backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Auth endpoints - using API prefixed paths (Option 2)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/login',
    SIGNUP: '/api/signup',
    REFRESH: '/api/refresh-token',
    LOGOUT: '/api/logout',
    STATUS: '/api/auth-status',
    FORGOT_PASSWORD: '/api/auth/request-password-reset',
    RESET_PASSWORD: '/api/auth/reset-password',
    GOOGLE_LOGIN: '/api/google/login',
    GOOGLE_CALLBACK: '/api/google/callback'
  },
  TEACHER: {
    REGISTER: '/teachers/register',
    JOBS: '/teachers/jobs',
    APPLICATIONS: '/teachers/applications'
  },
  PARENT: {
    TUTORING: '/requests/tutoring'
  },
  SCHOOL: {
    SERVICES: '/requests/school-services'
  },
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings'
  }
};

// Helper to get full endpoint URL
export const getApiUrl = (endpoint: string): string => {
  if (endpoint.startsWith('/')) {
    return `${API_BASE_URL}${endpoint}`;
  }
  return `${API_BASE_URL}/${endpoint}`;
};
