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

// Different levels of variable importance
const recommendedEnvVars = {
  production: [
    'VITE_API_URL', // Required in production to specify the API server
  ],
  optional: [
    'VITE_GOOGLE_CLIENT_ID', // Only needed if Google auth is used
  ]
} as const;

// Only warn about missing variables in production or when debugging is enabled
const isProd = import.meta.env.PROD;
const isDebugEnabled = import.meta.env.VITE_ENABLE_API_DEBUG === 'true';

// Check required production variables
for (const envVar of recommendedEnvVars.production) {
  if (isProd && !import.meta.env[envVar]) {
    console.error(`Error: Required production environment variable missing: ${envVar}`);
  } else if (!import.meta.env[envVar] && isDebugEnabled) {
    console.info(`Info: ${envVar} not set. In development, API calls will use the Vite proxy.`);
  }
}

// Check optional variables only when debugging
for (const envVar of recommendedEnvVars.optional) {
  if (!import.meta.env[envVar] && isDebugEnabled) {
    console.info(`Info: Optional environment variable ${envVar} is not set. Some features may not work.`);
  }
}

// Do not check for JWT Secret in frontend code - it should only exist on backend

// Export individual environment variables for direct import
export const GOOGLE_CLIENT_ID = config.google.clientId;

// Helper function to check if we're in development mode
export const isDevelopment = import.meta.env.DEV;

export default config;
