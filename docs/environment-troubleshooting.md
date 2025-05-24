# Environment Variables Troubleshooting

This guide helps resolve common issues related to environment variables in the Uniqwrites frontend application.

## Common Environment Variable Warnings

### Missing VITE_API_URL

**Warning message:** `Missing recommended environment variable: VITE_API_URL`

**What it means:**
- In development: Should be set to `/api` to enable proper API routing through Vite's proxy
- In production: Required to specify the complete backend API server URL

**How to fix:**
- For local development: Set to `/api` in your `.env` file
- For production: Set to your backend API URL (e.g., `VITE_API_URL=https://api.uniqwrites.com`)

### Missing VITE_GOOGLE_CLIENT_ID

**Warning message:** `Google Client ID is missing. Set VITE_GOOGLE_CLIENT_ID in your .env file.`

**What it means:**
- Google sign-in functionality is disabled because no client ID is configured

**How to fix:**
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Configure OAuth consent screen
3. Create OAuth 2.0 Client ID for Web Application
4. Add your development URL (e.g., `http://localhost:5173`) to authorized JavaScript origins
5. Copy the Client ID to your `.env` file: `VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com`

### JWT Secret Warning

**Warning message:** `Warning: JWT Secret is not set in environment variables`

**What it means:**
- This is actually expected - JWT secrets should NEVER be in frontend code
- The warning has been removed in newer versions

**How to fix:**
- Ignore this message, it's been disabled in the latest version
- JWT secrets should only exist on your backend server

## Debugging API Connections

If you're experiencing API connection issues:

1. Enable API debugging in your `.env` file:
   ```
   VITE_ENABLE_API_DEBUG=true
   ```

2. Monitor your browser console for detailed API URL construction logs

3. Check the Network tab in browser developer tools to see:
   - Actual URLs being requested
   - Status codes and responses
   - Any CORS errors

## Environment File Priority

Vite loads environment variables from these files in order:
1. `.env.${mode}.local` (e.g., `.env.development.local`)
2. `.env.${mode}` (e.g., `.env.development`)
3. `.env.local`
4. `.env`

Higher files in this list take precedence.

## Common Solutions

1. **Browser cache issues:**
   - Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Clear your browser cache
   - Restart your development server

2. **Missing environment variables after changes:**
   - Environment variables are read at build time
   - Restart your development server after changing `.env` files

3. **Different behavior in development vs production:**
   - Create separate `.env.development` and `.env.production` files
   - Use `.env.local` for settings that shouldn't be committed to version control

## Quick Check Command

Run this command in your terminal to verify environment variables:

```powershell
Get-Content .env | ForEach-Object { if ($_ -match "^VITE_") { Write-Host $_ } }
```

This will list all VITE_ environment variables without showing their values.
