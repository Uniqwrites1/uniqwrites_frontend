# API Integration Guide for Uniqwrites Frontend

This guide provides examples and best practices for working with the Uniqwrites backend API.

## Current Configuration

The frontend is configured to communicate with the backend running at:

```bash
http://localhost:8080
```

## Authentication Endpoints

The backend supports three patterns for authentication endpoints to be flexible with frontend implementations. Our application currently uses Option 2 (API Prefixed Paths):

### Available Authentication Endpoint Patterns

1. **Direct Paths**: `/login`, `/signup`, etc.
2. **API Prefixed Paths**: `/api/login`, `/api/signup`, etc. **(Current Configuration)**
3. **API Auth Prefixed Paths**: `/api/auth/login`, `/api/auth/signup`, etc.

| Action | Current Endpoint | Method |
|--------|----------|--------|
| Login | `/api/login` | POST |
| Signup | `/api/signup` | POST |
| Google Login | `/api/google/login` | POST |
| Forgot Password | `/api/forgot-password` | POST |
| Refresh Token | `/api/refresh-token` | POST |
| Logout | `/api/logout` | POST |

## Making API Calls

### Basic Authentication

```typescript
// Login example
import { authService } from '../services/authService';

const handleLogin = async (email, password, role) => {
  try {
    const response = await authService.login(email, password, role);
    // Response structure now includes:
    // { success: true, token: "...", message: "Login successful", role: "TEACHER", name: "John Doe", email: "john@example.com", user: {...} }
    
    if (!response.success) {
      throw new Error(response.message || 'Login failed');
    }
    
    // Success - user is now logged in
    return {
      user: response.user,
      role: response.role,
      name: response.name
    };
  } catch (error) {
    // Handle login error
    console.error('Login failed:', error);
    throw error;
  }
};

// Signup example
const handleSignup = async (userData) => {
  try {
    const response = await authService.signup({
      email: userData.email,
      password: userData.password,
      role: userData.role,
      name: `${userData.firstName} ${userData.lastName}`, // Now sending full name field
      profile: {
        firstName: userData.firstName,
        lastName: userData.lastName
      }
    });
    
    if (!response.success) {
      throw new Error(response.message || 'Signup failed');
    }
    
    // Success - user is now registered and logged in
    return {
      user: response.user,
      role: response.role,
      name: response.name
    };
  } catch (error) {
    // Handle signup error
    console.error('Signup failed:', error);
    throw error;
  }
};

// Password reset request example
const handleForgotPassword = async (email) => {
  try {
    await authService.sendPasswordResetEmail(email);
    // Success - password reset email sent
  } catch (error) {
    // Handle password reset request error
    console.error('Password reset request failed:', error);
    throw error;
  }
};
```

### Accessing Protected Endpoints

All requests to protected endpoints will automatically include the authentication token thanks to our axios interceptor.

```typescript
import api from '../api/axios';

// Example of accessing a protected endpoint
const fetchUserDashboard = async () => {
  try {
    const response = await api.get('/user-dashboard');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    throw error;
  }
};

// Example of posting data to a protected endpoint
const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};
```

## Common Issues & Solutions

### CORS Issues

If you encounter CORS errors:

1. Verify the backend is running and accessible
2. Check that the frontend is running on the expected origin (`http://localhost:5173`)
3. Ensure backend CORS configuration includes your frontend origin
4. Confirm that `withCredentials: true` is set in the axios config

### Authentication Problems

If authentication fails:

1. Check the browser network tab for the exact response from the server
2. Verify the request payload format matches what the backend expects
3. Ensure you're using the correct API endpoint paths
4. Check for any token expiration issues

### Token Handling

Our application stores the JWT token and user information as follows:

```typescript
// After successful login:
localStorage.setItem('authToken', response.data.token);
localStorage.setItem('userRole', response.data.role);
localStorage.setItem('userName', response.data.name);
localStorage.setItem('userEmail', response.data.email);

// For backward compatibility, we also store the full user object:
localStorage.setItem('user', JSON.stringify(response.data.user));
```

The authentication token is automatically added to all API requests through our axios interceptor:

```typescript
// From our axios.ts interceptor
instance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
```

## Testing API Endpoints

For manual testing of API endpoints, you can use the browser's developer tools or tools like Postman or Insomnia.

## Security Best Practices

1. Never store sensitive user data in localStorage or sessionStorage
2. Always use HTTPS in production
3. Implement token expiration and refresh mechanisms
4. Validate all input data before sending to the backend
5. Handle authentication errors gracefully with proper user feedback
