# Backend Error Troubleshooting Guide

## Common Backend Errors

### "Index X out of bounds for length X" Error

This error typically occurs in Java backends when there's an attempt to access an array element outside its bounds.

```
Index 70 out of bounds for length 70
```

#### Potential Causes:

1. **Zero-based indexing issue**: 
   - In Java, arrays are zero-indexed (positions 0 to length-1)
   - Trying to access the position equal to the array length will cause this error
   - Example: If array length is 70, valid indices are 0-69, accessing index 70 causes error

2. **Issue with password hashing or encryption**:
   - The error often appears during login/signup operations 
   - Could indicate a problem with how passwords are being hashed or encrypted
   - Length mismatch between expected and actual byte arrays
   - **CONFIRMED ISSUE**: Long passwords (>50 characters) are triggering array bounds errors

3. **Data truncation**:
   - Request data could be getting truncated during transmission
   - CORS or proxy configuration might be affecting data integrity

#### Implemented Fix:

We've implemented a client-side fix to prevent this error by truncating long passwords:

1. Login, signup, and password reset functions now limit passwords to 50 characters
2. Warning logs are generated when truncation occurs
3. See `docs/password-length-fix.md` for complete details

#### Troubleshooting Steps:

1. **Check backend logs** for the full stack trace to identify exactly which line of code is causing the error

2. **Verify request payload size and format**:
   - Make sure passwords meet expected length requirements
   - Check if there are any character encoding issues
   - Try a shorter password to see if the error persists

3. **Check for any data transformation in the proxy**:
   - Ensure that the Vite proxy isn't modifying request bodies
   - Look for any middleware that might be transforming data

4. **Review backend code for off-by-one errors**:
   - Array access should use index < array.length, not index <= array.length
   - Pay special attention to loops or string operations

## Investigating API Problems

When troubleshooting API issues, follow these steps:

1. **Enable API debugging**:
   - Set `VITE_ENABLE_API_DEBUG=true` in your `.env` file
   - This will log detailed information about API URL construction

2. **Use browser developer tools**:
   - Open the Network panel to inspect requests
   - Check for request/response headers and body content
   - Look for CORS errors in the Console

3. **Check Vite server logs**:
   - The proxy rewrite logs show how URLs are being transformed
   - Look for any error messages during proxy operations

4. **Verify backend server logs**:
   - Connect to the backend server to check logs
   - Look for exceptions or warnings related to incoming requests

5. **Test API endpoints directly**:
   - Use tools like Postman to test the backend API directly
   - This can help determine if the issue is with the frontend or backend

## Common Solutions

1. **CORS Issues**:
   - Ensure the backend has proper CORS configuration
   - Headers should allow your frontend origin, credentials, and methods

2. **Authentication**:
   - Verify that tokens are being correctly sent and processed
   - Check token format, expiration, and header names

3. **Proxy Configuration**:
   - Confirm that the Vite proxy is correctly forwarding requests
   - Verify that content-type headers are preserved

4. **Backend Validation**:
   - Review backend validation logic for any strict requirements
   - Check for input size limitations or character restrictions
