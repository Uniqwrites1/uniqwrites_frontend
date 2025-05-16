import axios from "axios";
import { ErrorHandler } from "../utils/errorHandler";
import { authService } from "../services/authService";
import { API_ENDPOINTS } from "../proxy";

// Extend axios request config to include our custom properties
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
    _skipAuthRefresh?: boolean;
  }
}

// Create axios instance with default configuration
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
  withCredentials: true // Important for CORS with credentials
});

// Track if we're currently refreshing the token
let isRefreshing = false;
// Queue of requests that are waiting for a token refresh
let refreshSubscribers: Array<(token: string) => void> = [];

// Subscribe to token refresh
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Execute subscribers with new token
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Skip auth for refresh requests to avoid infinite loops
    if (config.headers?.["X-Skip-Auth-Refresh"] === "true") {
      config._skipAuthRefresh = true;
    }
    
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add timestamp to requests to prevent caching issues
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    return config;
  },
  (error) => {
    ErrorHandler.logError(error as Error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip this if the request itself is to refresh token to prevent infinite loops
      if (originalRequest.url === API_ENDPOINTS.AUTH.REFRESH || originalRequest._skipAuthRefresh) {
        console.warn("Received 401 during refresh token process");
        authService.logout();
        window.location.href = '/auth?expired=true';
        return Promise.reject(new Error('Authentication refresh failed. Please login again.'));
      }
      
      // If we're not already refreshing the token
      if (!isRefreshing) {
        console.log(`Starting token refresh process for ${originalRequest.url}`);
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          // Save current URL for redirect after login if refresh fails
          const currentPath = window.location.pathname + window.location.search;
          if (!currentPath.includes('/auth') && !currentPath.includes('/login') && !currentPath.includes('/signup')) {
            localStorage.setItem('redirectAfterLogin', currentPath);
          }
          
          // Try to refresh the token
          const newToken = await authService.refreshToken();
          
          if (newToken) {
            console.log("Token refreshed successfully, retrying original request");
            // Update the auth header
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // Retry all queued requests with new token
            onTokenRefreshed(newToken);
            // Retry the original request
            return instance(originalRequest);
          } else {
            console.warn("Token refresh failed - redirecting to login");
            // If refresh failed, logout and redirect
            authService.logout();
            // Redirect with a query param to show proper message
            window.location.href = '/auth?session=expired';
            return Promise.reject(new Error('Session expired. Please login again.'));
          }        } catch (refreshError) {
          console.error("Error during token refresh:", refreshError);
          // If refresh fails, logout and redirect
          authService.logout();
          window.location.href = '/auth?error=refresh';
          return Promise.reject(new Error('Authentication error. Please login again.'));
        } finally {
          isRefreshing = false;
        }
      } else {
        console.log(`Request queued while refreshing token: ${originalRequest.url}`);
        // If we're already refreshing, add this request to the queue
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
    }

    // Handle other errors
    if (!error.response) {
      // Network error or server not responding
      const requestUrl = `${originalRequest?.baseURL || ''}${originalRequest?.url || ''}`;
      const errorContext = `Network Error: ${originalRequest?.method?.toUpperCase() || 'Unknown'} ${requestUrl}`;
      
      // Check for offline status
      if (!navigator.onLine) {
        ErrorHandler.logError(
          new Error(`Device offline: User is not connected to the internet (${requestUrl})`),
          errorContext
        );
        return Promise.reject(new Error('You appear to be offline. Please check your internet connection and try again.'));
      }
      
      // General network error
      ErrorHandler.logError(
        new Error(`Network error: No response from server (${requestUrl})`),
        errorContext
      );
      
      return Promise.reject(new Error('Network error: The server is not responding. Please try again later.'));
    }
      const requestUrl = `${originalRequest?.baseURL || ''}${originalRequest?.url || ''}`;
    
    // Extract message from response, with multiple fallbacks
    const getErrorMessage = () => {
      const data = error.response.data;
      if (typeof data === 'string') return data;
      return data?.message || data?.error || data?.errorMessage || 
             (data?.errors && Array.isArray(data.errors) ? data.errors[0]?.message : null) ||
             'Unknown error occurred';
    };
    
    const errorMessage = getErrorMessage();
    
    switch (error.response.status) {      case 400:
        ErrorHandler.logError(error as Error, `Bad Request: ${requestUrl}`);
        console.log('Bad Request Response Data:', error.response.data);
        return Promise.reject(new Error(errorMessage || 'The request contained invalid data. Please check and try again.'));
      case 403:
        ErrorHandler.logError(error, `Forbidden: ${requestUrl}`);
        // Track auth errors for security monitoring
        if (originalRequest?.url && !originalRequest.url.includes('/auth/')) {
          console.warn('Possible unauthorized access attempt:', {
            url: requestUrl,
            method: originalRequest?.method,
          });
        }
        return Promise.reject(new Error('You do not have permission to perform this action. Please contact support if you need access.'));
      case 404:
        ErrorHandler.logError(error, `Not Found: ${requestUrl}`);
        return Promise.reject(new Error(`The requested resource was not found. Please check the URL and try again.`));      case 422:
        ErrorHandler.logError(error as Error, `Validation Error: ${requestUrl}`);
        return Promise.reject(new Error(errorMessage || 'The provided data is invalid. Please check your inputs and try again.'));
      case 429:
        ErrorHandler.logError(error, `Rate Limited: ${requestUrl}`);
        return Promise.reject(new Error('Too many requests. Please wait a moment before trying again.'));      case 500:
        // Log detailed server error information for debugging
        console.error('Server Error Details:', {
          url: requestUrl,
          method: originalRequest?.method,
          responseData: error.response.data,
          responseHeaders: error.response.headers,
          requestData: originalRequest?.data
        });        ErrorHandler.logError(error as Error, `Server Error: ${requestUrl}`);
        return Promise.reject(new Error('An internal server error occurred. Our team has been notified. Please try again later.'));
      default:
        ErrorHandler.logError(error as Error, `HTTP Error ${error.response.status}: ${requestUrl}`);
        return Promise.reject(new Error(`An error occurred (${error.response.status || 'Unknown'}). Please try again later.`));
    }
  }
);

export default instance;
