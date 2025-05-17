# Authentication Flow Guide for Uniqwrites

## Overview

This guide explains the authentication flow in the Uniqwrites application. It covers login, signup, redirection, and troubleshooting common authentication issues.

## Authentication Flow

1. **Initial Access**:
   - Users begin at the authentication page (`/auth`) where they can choose their role (teacher, parent, school, admin)
   - From there, they can either log in or sign up

2. **Login/Signup Process**:
   - After entering credentials, users are redirected to their role-specific dashboard
   - The system remembers the intended destination if a protected route was accessed first
   - Google login is also available and follows the same flow

3. **Dashboard Access**:
   - Each role has its specific dashboard:
     - `/teacher/dashboard` for teachers
     - `/parent/dashboard` for parents
     - `/school/dashboard` for schools
     - `/admin/dashboard` for admins
   - Users can only access dashboards appropriate for their role

## Protected Routes

- All dashboard routes are protected and require authentication
- If a user tries to access a dashboard without being logged in, they are redirected to the authentication page
- After successful login, they are redirected to the originally requested dashboard
- If a user tries to access a dashboard for a different role, they are redirected to the unauthorized page

## Troubleshooting Login Issues

### Common Problems and Solutions

1. **Not redirecting to dashboard after login**:
   - Check if cookies/local storage is enabled in the browser
   - Clear browser cache and local storage, then try again
   - Make sure the correct role is selected during login

2. **"Unauthorized" error after login**:
   - You may be trying to access a dashboard that doesn't match your role
   - Log out completely, then log back in with the correct role

3. **Login session expires immediately**:
   - Check internet connection
   - Clear cookies and local storage
   - Try using incognito/private browsing mode

4. **Google login issues**:
   - Make sure you're using a valid Google account
   - Check if there are popup blockers preventing the Google login window
   - Ensure the application has a valid Google OAuth client ID
   - Try clearing browser cache and cookies

## Authentication Implementation

### Traditional Login

The application uses JWT-based authentication:

1. User enters email and password
2. Frontend sends credentials to `/api/login` endpoint
3. Backend validates credentials and returns a JWT token
4. Frontend stores the token in localStorage as 'authToken'
5. Subsequent API requests include the token in the Authorization header

### Google OAuth Login

The application supports Google OAuth through the `@react-oauth/google` package:

1. User clicks "Continue with Google" button
2. Google OAuth popup opens for authentication
3. Google returns a credential token
4. Frontend sends this token to `/api/google/login` endpoint along with the desired role
5. Backend validates the Google token, creates a user account if needed, and returns a JWT token
6. Frontend stores the token in localStorage as 'authToken'

### Password Reset

The application supports password reset functionality:

1. User clicks "Forgot Password?" button
2. User enters their email address
3. Frontend sends the email to `/api/forgot-password` endpoint
4. Backend generates a password reset token and sends an email with a reset link
5. User receives the email and clicks the reset link
6. User is directed to a password reset page where they can set a new password

## Token Management

- JWT tokens are stored in localStorage as 'authToken'
- Refresh tokens are stored in localStorage as 'refreshToken' (when available)
- The `authService` in `src/services/authService.ts` handles token management
- Token expiration is monitored with automatic refresh when needed

## Google OAuth Configuration

To use Google OAuth:

1. Set up a Google Cloud project
2. Configure the OAuth consent screen
3. Create OAuth 2.0 Client ID credentials
4. Add the Client ID to your `.env` file as `VITE_GOOGLE_CLIENT_ID`
   - Ensure popup blockers are disabled
   - Try a different browser
   - Check if third-party cookies are enabled

### Testing Authentication

You can use the Authentication Test Tool at `/auth-test` to verify your login status and quickly test different authentication flows.

## Security Notes

- Login tokens are stored in localStorage
- Session will expire after period of inactivity
- Always log out when using shared computers

## Need Help?

If you encounter any authentication issues not covered here, please contact support at [support@uniqwrites.com](mailto:support@uniqwrites.com)

---

## Developer Notes

The authentication system uses:

- JWT tokens for authentication
- Role-based access control (RBAC)
- Protected route components for security
- Dashboard layouts with built-in auth checks
- Centralized auth hooks and utilities for consistency
