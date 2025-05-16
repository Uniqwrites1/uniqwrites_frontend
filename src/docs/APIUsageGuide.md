# API Integration Guide for Uniqwrites Frontend

This guide provides examples and best practices for working with the Uniqwrites backend API.

## Current Configuration

The frontend is configured to communicate with the backend running at:
```
http://localhost:8080
```

## Authentication Endpoints

Our application uses direct path authentication endpoints as recommended:

| Action | Endpoint | Method |
|--------|----------|--------|
| Login | `/login` | POST |
| Signup | `/signup` | POST |
| Google Login | `/google/login` | POST |
| Forgot Password | `/forgot-password` | POST |
| Refresh Token | `/refresh-token` | POST |
| Logout | `/logout` | POST |

## Making API Calls

### Basic Authentication

```typescript
// Login example
import { authService } from '../services/authService';

const handleLogin = async (email, password, role) => {
  try {
    const response = await authService.login(email, password, role);
    // Success - user is now logged in
    return response.user;
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
      profile: {
        firstName: userData.firstName,
        lastName: userData.lastName
      }
    });
    // Success - user is now registered and logged in
    return response.user;
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
2. Check that the frontend is running on the expected origin (http://localhost:5173)
3. Ensure backend CORS configuration includes your frontend origin
4. Confirm that `withCredentials: true` is set in the axios config

### Authentication Problems

If authentication fails:

1. Check the browser network tab for the exact response from the server
2. Verify the request payload format matches what the backend expects
3. Ensure you're using the correct API endpoint paths
4. Check for any token expiration issues

### Token Handling

Our application stores the JWT token as `authToken` in localStorage and automatically adds it to all API requests through the axios interceptor.

## Testing API Endpoints

For manual testing of API endpoints, you can use the browser's developer tools or tools like Postman or Insomnia.

## Security Best Practices

1. Never store sensitive user data in localStorage or sessionStorage
2. Always use HTTPS in production
3. Implement token expiration and refresh mechanisms
4. Validate all input data before sending to the backend
5. Handle authentication errors gracefully with proper user feedback
