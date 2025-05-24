/**
 * Proxy configuration helper for API requests
 * 
 * This file helps manage API endpoints and handles proxy configuration between 
 * frontend and backend services. It provides a consistent way to construct API URLs
 * that works in both development and production environments.
 * 
 * In development:
 * - When VITE_API_URL is not set, requests go through Vite's proxy at /api/*
 * - Vite forwards these requests to the backend server (localhost:8080)
 * 
 * In production:
 * - The VITE_API_URL environment variable should be set to the production API URL
 * - Requests go directly to that URL without requiring a proxy
 * 
 * Debugging:
 * - Set VITE_ENABLE_API_DEBUG=true in your .env file to enable detailed API URL logs
 */

// Base API URL from environment or default to empty string to use relative URLs with Vite's proxy
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Enable detailed API debugging when VITE_ENABLE_API_DEBUG=true
export const API_DEBUG_ENABLED = import.meta.env.VITE_ENABLE_API_DEBUG === 'true';

// API endpoints defined WITHOUT the /api prefix
// The getApiUrl helper function will add the prefix when needed
// This prevents requests from going to /api/api/...
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    REFRESH: '/refresh-token',
    LOGOUT: '/logout',
    STATUS: '/auth-status',
    FORGOT_PASSWORD: '/forgot-password', // Changed to match backend endpoint
    RESET_PASSWORD: '/reset-password', // Changed to match backend endpoint structure
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

/**
 * Helper function to construct API URLs with proper prefixes
 * 
 * This function ensures proper URL construction regardless of environment:
 * 1. In development without VITE_API_URL: Adds /api prefix for Vite proxy
 * 2. In production with VITE_API_URL: Uses the full base URL
 * 
 * @param endpoint - The API endpoint path (e.g., '/login', '/signup')
 * @returns The complete URL to use for API requests
 */
export const getApiUrl = (endpoint: string): string => {
  // Only log debug info when API_DEBUG_ENABLED is true
  const logDebug = (message: string) => {
    if (API_DEBUG_ENABLED) {
      console.log(message);
    }
  };
  
  // Start debug logging if enabled
  logDebug(`==== API URL BUILDER ====`);
  logDebug(`Input endpoint: "${endpoint}"`);
  logDebug(`API_BASE_URL: "${API_BASE_URL}"`);
  
  // Clean up the endpoint to ensure consistent format
  const cleanEndpoint = endpoint.trim();
  logDebug(`Cleaned endpoint: "${cleanEndpoint}"`);
  
  // If the endpoint already starts with /api, don't add it again
  if (cleanEndpoint.startsWith('/api/')) {
    logDebug(`WARNING: Endpoint already has /api prefix: "${cleanEndpoint}"`);
    logDebug(`This may cause double-prefix issues if Vite proxy is also configured to use /api`);
    return cleanEndpoint;
  }
  
  // If API_BASE_URL is provided (production mode), use it as the base
  if (API_BASE_URL) {
    // Ensure endpoint starts with /
    const formattedEndpoint = cleanEndpoint.startsWith('/') ? cleanEndpoint : `/${cleanEndpoint}`;
    const fullUrl = `${API_BASE_URL}${formattedEndpoint}`;
    logDebug(`Using production API URL: "${fullUrl}"`);
    logDebug(`==== END URL BUILDER ====`);
    return fullUrl;
  }
  
  // In development without API_BASE_URL specified:
  // Add /api prefix for Vite's proxy
  const formattedEndpoint = cleanEndpoint.startsWith('/') ? cleanEndpoint : `/${cleanEndpoint}`;
  const devUrl = `/api${formattedEndpoint}`;
  logDebug(`Using development API URL with proxy: "${devUrl}"`);
  logDebug(`This URL will be forwarded to: "http://localhost:8080${formattedEndpoint}" by Vite`);
  logDebug(`==== END URL BUILDER ====`);
  return devUrl;
};
