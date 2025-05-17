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
  'VITE_JWT_SECRET',
  'VITE_API_URL',
  'VITE_GOOGLE_CLIENT_ID',
] as const;

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Export individual environment variables for direct import
export const GOOGLE_CLIENT_ID = config.google.clientId;

export default config;
