import api from '../api/axios';
import { ErrorHandler } from '../utils/errorHandler';
import type { User, SignupData } from '../context/AuthContext';
import { API_ENDPOINTS } from '../proxy';

// Extend Window interface to allow for token monitor ID
declare global {
  interface Window {
    __tokenMonitorId?: number;
  }
}

interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
  refreshToken?: string;
  user: User;
  role?: string;
  name?: string;
  email?: string;
  expiresIn?: number;
}

interface RefreshTokenResponse {
  success: boolean;
  token: string;
  message?: string;
  refreshToken?: string;
  expiresIn?: number;
}

export const authService = {  async login(email: string, password: string, role: string): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
        role
      });
      
      if (response.data.success === false) {
        throw new Error(response.data.message || 'Login failed');
      }
      
      if (response.data.token) {
        this.setSession(response.data);
      }
      
      return response.data;
    } catch (error) {
      ErrorHandler.logError(error);
      throw error;
    }
  },

  async signup(data: SignupData): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.SIGNUP, data);
      
      if (response.data.token) {
        this.setSession(response.data);
      }
      
      return response.data;
    } catch (error) {
      ErrorHandler.logError(error);
      throw error;
    }
  },  logout(): void {
    // Remove all auth-related data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    // Remove the Authorization header
    if (api.defaults.headers) {
      delete api.defaults.headers.common['Authorization'];
    }
  },setSession(authResponse: LoginResponse): void {
    // Check if response was successful
    if (!authResponse.success && authResponse.message) {
      console.error(`Authentication error: ${authResponse.message}`);
      return;
    }
    
    localStorage.setItem('authToken', authResponse.token);
    
    // Store additional user information if available
    if (authResponse.role) {
      localStorage.setItem('userRole', authResponse.role);
    }
    
    if (authResponse.name) {
      localStorage.setItem('userName', authResponse.name);
    }
    
    if (authResponse.email) {
      localStorage.setItem('userEmail', authResponse.email);
    }
    
    // Configure future requests to use this token
    if (api.defaults.headers) {
      api.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token}`;
    }
    
    if (authResponse.refreshToken) {
      localStorage.setItem('refreshToken', authResponse.refreshToken);
    }
    
    if (authResponse.expiresIn) {
      // Set token expiration time
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + authResponse.expiresIn);
      localStorage.setItem('tokenExpiry', expiresAt.toISOString());
      
      // Start token monitoring if needed
      this.startTokenExpiryMonitor();
    }
    
    // Continue storing full user object for backward compatibility
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  },
  
  // Token monitoring to preemptively refresh before expiration
  startTokenExpiryMonitor(): void {
    // Clear any existing monitor
    this.stopTokenExpiryMonitor();
    
    // Only set up monitor if we have a refresh token
    if (!localStorage.getItem('refreshToken')) {
      return;
    }
    
    const expiryStr = localStorage.getItem('tokenExpiry');
    if (!expiryStr) return;
    
    const expiry = new Date(expiryStr);
    const now = new Date();
    
    // Calculate time until token needs refresh (75% of total lifetime)
    const totalTimeMs = expiry.getTime() - now.getTime();
    const refreshTimeMs = totalTimeMs * 0.75;
    
    // Don't set up monitor if already expired
    if (refreshTimeMs <= 0) return;
    
    console.log(`Setting up token refresh monitor to trigger in ${Math.round(refreshTimeMs/1000)} seconds`);
    
    // Set up monitor
    const tokenMonitorId = window.setTimeout(async () => {
      console.log("Token monitor triggered, checking if refresh needed");
      // Only refresh if still authenticated
      if (this.isAuthenticated() && localStorage.getItem('refreshToken')) {
        console.log("Preemptively refreshing token");
        await this.refreshToken();
      }
    }, refreshTimeMs);
    
    // Store the timeout ID
    window.__tokenMonitorId = tokenMonitorId;
  },
  
  stopTokenExpiryMonitor(): void {
    if (window.__tokenMonitorId) {
      clearTimeout(window.__tokenMonitorId);
      window.__tokenMonitorId = undefined;
    }
  },
  isTokenExpired(): boolean {
    const expiryStr = localStorage.getItem('tokenExpiry');
    if (!expiryStr) return true;
    
    const expiry = new Date(expiryStr);
    // Add a 30-second buffer to prevent edge cases
    const now = new Date();
    now.setSeconds(now.getSeconds() + 30);
    return now >= expiry;
  },    async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error("No refresh token available");
        return null;
      }
        
      console.log("Attempting to refresh token...");
      const response = await api.post<RefreshTokenResponse>(
        API_ENDPOINTS.AUTH.REFRESH, 
        { refreshToken },
        // Use header to signal this is a refresh request
        { headers: { 'X-Skip-Auth-Refresh': 'true' } }
      );
      
      if (response.data && response.data.token) {
        console.log("Token refreshed successfully");
        localStorage.setItem('authToken', response.data.token);
        
        // Update authorization header for future requests
        if (api.defaults.headers) {
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        
        if (response.data.expiresIn) {
          const expiresAt = new Date();
          expiresAt.setSeconds(expiresAt.getSeconds() + response.data.expiresIn);
          localStorage.setItem('tokenExpiry', expiresAt.toISOString());
        }
        
        return response.data.token;
      }
      
      console.error("Token refresh response did not contain a new token");
      return null;
    } catch (error) {
      ErrorHandler.logError(error as Error, "Token refresh failed");
      // Don't logout here, let the interceptor handle the logout
      // If we logout here, we might get into loop situations
      return null;
    }
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken') && !this.isTokenExpired();
  },  getToken(): string | null {
    // First check if token is expired
    if (this.isTokenExpired()) {
      // We'll handle refresh in the axios interceptor
      return localStorage.getItem('authToken');
    }
    return localStorage.getItem('authToken');
  },
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      // Using the updated endpoint that matches the backend's Option 1
      await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    } catch (error) {
      ErrorHandler.logError(error);
      throw error;
    }
  },
    async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // Reset password endpoint from API_ENDPOINTS
      await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        newPassword
      });
    } catch (error) {
      ErrorHandler.logError(error);
      throw error;
    }
  },async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user?: User }> {
    try {
      // First check if we even have a token
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log("No token found in storage");
        return { isAuthenticated: false };
      }

      // If token is expired and we have a refresh token, try to refresh
      if (this.isTokenExpired() && localStorage.getItem('refreshToken')) {
        console.log("Token expired, attempting refresh");
        const newToken = await this.refreshToken();
        if (!newToken) {
          console.log("Token refresh failed");
          this.logout();
          return { isAuthenticated: false };
        }
        console.log("Token refreshed successfully");
      }

      // After potential refresh, get token again
      const currentToken = this.getToken();
      if (!currentToken) {
        console.log("No token available after refresh attempt");
        return { isAuthenticated: false };
      }      try {
        console.log("Verifying authentication status with server");
        const response = await api.get<{ user: User }>(API_ENDPOINTS.AUTH.STATUS);
        
        // If we reach here, the token is valid
        console.log("Authentication verified successfully");
        
        // If we have a user in localStorage but it doesn't match the one from the server,
        // update the localStorage user
        const storedUser = this.getCurrentUser();
        if (storedUser && response.data.user && storedUser.id !== response.data.user.id) {
          console.log("Updating stored user data");
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return {
          isAuthenticated: true,
          user: response.data.user
        };
      } catch (statusError) {
        // Define response type interface for typing
        interface ErrorWithResponse {
          response?: { status?: number };
        }
        
        // Check if it's an auth error by casting to our interface
        const typedError = statusError as ErrorWithResponse;
        if (typedError.response && typedError.response.status === 401) {
          console.log("Server rejected authentication");
          this.logout();
          return { isAuthenticated: false };
        }
        
        // If it's another error (like network), use stored data as fallback
        // This prevents users from being logged out unnecessarily on network issues
        const storedUser = this.getCurrentUser();
        if (storedUser) {
          console.warn("Auth status check failed, but using stored credentials as fallback");
          return {
            isAuthenticated: true,
            user: storedUser
          };
        }
        
        // No fallback available
        throw statusError;
      }
    } catch (error) {
      ErrorHandler.logError(error as Error, "Auth status check failed");
      
      // Define response type interface for typing
      interface ErrorWithResponse {
        response?: { status?: number };
      }
      
      // Only logout if we're sure the token is invalid
      const typedError = error as ErrorWithResponse;
      if (typedError.response && typedError.response.status === 401) {
        this.logout();
      }
      
      return { isAuthenticated: false };
    }
  }
};
