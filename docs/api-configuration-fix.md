# API Configuration Fix

## Problem Overview

The application was experiencing API connectivity issues where requests were being sent to incorrect URLs:
- Requests were going to `http://localhost:5173/api/api/signup` instead of `http://localhost:8080/api/signup`
- This caused CORS errors and network failures for API requests

## Root Causes

1. **Duplicate `/api` prefix**: The `/api` prefix was being added twice:
   - Once in the `getApiUrl` helper function in `proxy.ts`
   - And again by the axios instance's baseURL configuration

2. **Incorrect Vite proxy configuration**: The proxy wasn't correctly stripping the `/api` prefix before forwarding requests to the backend.

## Implementation Details

### 1. Enhanced API URL Construction

We've improved the `getApiUrl` function in `proxy.ts` to:
- Correctly handle API path construction
- Prevent duplicate `/api` prefixes
- Add detailed logging for easier debugging
- Support both development and production environments

```typescript
export const getApiUrl = (endpoint: string): string => {
  // Clean up the endpoint to ensure consistent format
  const cleanEndpoint = endpoint.trim();
  
  // If the endpoint already starts with /api, don't add it again
  if (cleanEndpoint.startsWith('/api/')) {
    return cleanEndpoint;
  }
  
  // If API_BASE_URL is provided (production mode), use it as the base
  if (API_BASE_URL) {
    const formattedEndpoint = cleanEndpoint.startsWith('/') ? cleanEndpoint : `/${cleanEndpoint}`;
    return `${API_BASE_URL}${formattedEndpoint}`;
  }
  
  // In development: Add /api prefix for Vite's proxy
  const formattedEndpoint = cleanEndpoint.startsWith('/') ? cleanEndpoint : `/${cleanEndpoint}`;
  return `/api${formattedEndpoint}`;
};
```

### 2. Corrected Vite Proxy Configuration

We've updated the proxy configuration in `vite.config.ts` to:
- Properly rewrite paths by removing the `/api` prefix before forwarding
- Add detailed logging for request/response debugging
- Set appropriate headers for API requests

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => {
        // Remove the /api prefix before sending to backend
        const rewrittenPath = path.replace(/^\/api/, '');
        console.log(`[Proxy Rewrite] ${path} => ${rewrittenPath}`);
        return rewrittenPath;
      }
    }
  }
}
```

### 3. Axios Instance Configuration

We've modified the axios instances to:
- Remove the `/api` prefix from the baseURL to prevent duplication
- Let the `getApiUrl` function handle API URL construction

## API Request Flow

1. Frontend code calls API endpoints without the `/api` prefix (e.g., `/signup`)
2. The `getApiUrl` function adds the `/api` prefix (e.g., `/api/signup`)
3. Request is sent to Vite dev server (e.g., `http://localhost:5173/api/signup`)
4. Vite proxy intercepts and removes the `/api` prefix
5. Request is forwarded to backend at `http://localhost:8080/signup`
6. Backend processes the request and returns a response

## Recent Updates (May 19, 2025)

### 1. Password Reset Endpoint Fix

Corrected the password reset endpoints in the API_ENDPOINTS configuration:
- Changed `FORGOT_PASSWORD` from `/auth/request-password-reset` to `/forgot-password`
- Changed `RESET_PASSWORD` from `/auth/reset-password` to `/reset-password`

### 2. Enhanced Debugging

Added configurable debug output for API URL construction:
- Added `API_DEBUG_ENABLED` flag controlled by `VITE_ENABLE_API_DEBUG` environment variable
- Enhanced logging to show exactly how URLs are being constructed
- Created detailed logs showing where requests are being forwarded

### 3. Google Login Improvements

Added error handling for missing Google client ID:
- Added detection of missing Google client ID configuration
- Added user-friendly message when Google login is unavailable due to missing client ID
- Enhanced documentation for setting up Google OAuth

### 4. Documentation Updates

Created new documentation to help with troubleshooting:
- Added detailed environment variables guide explaining all options
- Created backend error troubleshooting guide with focus on the "Index out of bounds" error
- Updated API configuration documentation

## Testing

After these changes, API requests should now correctly route to the backend server. 

1. Enable API debugging by adding `VITE_ENABLE_API_DEBUG=true` to your `.env` file
2. Monitor the console for detailed logs of API requests and URLs
3. Check network requests in browser dev tools to verify correct endpoints
4. Refer to `docs/backend-error-troubleshooting.md` if you encounter the "Index out of bounds" error