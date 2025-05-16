/**
 * Proxy configuration helper for API requests
 * This file helps manage API endpoints and handles proxy configuration
 */

// Base API URL from environment or default to backend URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Auth endpoints - using direct paths as recommended
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    REFRESH: '/refresh-token',
    LOGOUT: '/logout',
    STATUS: '/auth-status',
    FORGOT_PASSWORD: '/forgot-password',
    GOOGLE_LOGIN: '/google/login',
    GOOGLE_CALLBACK: '/google/callback'
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
