/**
 * Configuration utility to safely access environment variables
 */

const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  jwt: {
    secret: import.meta.env.VITE_JWT_SECRET,
  },
  api: {
    url: import.meta.env.VITE_API_URL,
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_JWT_SECRET',
  'VITE_API_URL',
] as const;

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default config;
