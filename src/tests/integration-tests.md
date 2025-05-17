# Integration Tests

This document provides instructions for manually testing the integration of key features in the Uniqwrites frontend application.

## Google OAuth Integration Test

1. **Prerequisites**:
   - Ensure the backend API is running and properly configured to handle Google OAuth
   - Verify that the Google Client ID in the `.env` file is valid and registered for your application

2. **Test Procedure**:
   - Navigate to `/login/teacher` or `/login/parent`
   - Click on the "Continue with Google" button
   - Complete the Google OAuth flow
   - Verify that you are redirected to the appropriate dashboard

3. **Expected Results**:
   - The Google login popup appears
   - After successful authentication, you are redirected to the dashboard
   - User information is stored in localStorage
   - The token is stored as 'authToken' in localStorage

4. **Error Handling Test**:
   - Cancel the Google login popup
   - Verify that an appropriate error message is displayed

## Forgot Password Test

1. **Prerequisites**:
   - Ensure the backend API is running and properly configured for password reset
   - Make sure the email service is configured correctly

2. **Test Procedure**:
   - Navigate to `/login/teacher` or `/login/parent`
   - Click on the "Forgot Password?" link
   - Enter an email address and click "Send Reset Link"

3. **Expected Results**:
   - A success message appears indicating that reset instructions were sent
   - No errors in the console
   - The user should receive an email with reset instructions

4. **Error Handling Test**:
   - Try with an invalid email
   - Verify that an appropriate error message is displayed

## Logout Button Positioning Test

1. **Test Procedure**:
   - Login to the teacher dashboard
   - Resize the browser window to different widths
   - Verify that the logout button is always visible and accessible

2. **Expected Results**:
   - The logout button remains at the bottom of the sidebar in all viewport sizes
   - The button does not overlap with other UI elements
   - The button is accessible and clickable at all times

## API Integration Test

1. **Test Procedure**:
   - Check the browser developer tools Network tab during login
   - Verify that requests are being sent to the correct endpoints
   - Check that tokens are stored properly in localStorage

2. **Expected Results**:
   - POST request to '/api/login' during regular login
   - POST request to '/api/google/login' during Google login
   - The Authorization header includes 'Bearer {token}' for authenticated requests
   - The token is stored as 'authToken' in localStorage

## Cross-Browser Testing

Test all the above scenarios in:
- Chrome
- Firefox
- Safari
- Edge

## Mobile Testing
- Test all features on mobile devices or mobile emulators
- Verify that responsive design works correctly in all breakpoints
