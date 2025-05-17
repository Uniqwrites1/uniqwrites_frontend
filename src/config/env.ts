/**
 * Configuration utility to safely access environment variables
 */

const config = {
  jwt: {
    secret: import.meta.env.VITE_JWT_SECRET,
  },
  api: {
    url: import.meta.env.VITE_API_URL,
  },
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'VITE_API_URL',
] as const;

// Variables that are important but not critical for local development
const recommendedEnvVars = [
  'VITE_GOOGLE_CLIENT_ID',
] as const;

// Check for required variables - these will throw errors if missing
for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Check for recommended variables - these will only warn if missing
for (const envVar of recommendedEnvVars) {
  if (!import.meta.env[envVar]) {
    console.warn(`Warning: Missing recommended environment variable: ${envVar}`);
  }
}

// JWT Secret should be provided by backend, not used in frontend
if (!import.meta.env.VITE_JWT_SECRET) {
  console.warn('Warning: JWT Secret is not set in environment variables');
}

// Export individual environment variables for direct import
export const GOOGLE_CLIENT_ID = config.google.clientId;

export default config;
