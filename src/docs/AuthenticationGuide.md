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
