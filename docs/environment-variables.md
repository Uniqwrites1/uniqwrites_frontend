# Environment Variables Guide

This document explains how to properly set up and secure environment variables for the Uniqwrites frontend application.

## Environment Files

- `.env`: Contains actual environment variables for local development (DO NOT COMMIT)
- `.env.example`: Template with placeholder values (safe to commit)

## Required Environment Variables

### API Configuration
- `VITE_API_URL`: Base URL for API requests, e.g., `/api` or `https://api.uniqwrites.com`

### Authentication
- `VITE_JWT_SECRET`: **IMPORTANT** - This should NOT be used in the frontend code. The JWT secret should only be stored and used on the backend server. The frontend should only receive and send JWTs, never handle the secret itself.

### Google OAuth
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID for authentication features

## Security Best Practices

1. **NEVER commit real secrets to version control**:
   - Keep `.env` in your `.gitignore` file
   - Use environment variables in CI/CD systems instead of hardcoded values

2. **JWT Handling**:
   - The frontend should only store and send JWTs, never create or validate them
   - JWT secrets should remain solely on the server side

3. **OAuth Client IDs**:
   - OAuth client IDs are generally safe to include in frontend code as they are public identifiers
   - However, OAuth client secrets should NEVER be in frontend code

4. **Rotating Secrets**:
   - If you suspect a secret has been exposed, rotate it immediately
   - This includes JWT secrets and any OAuth credentials

## What to Do If Secrets Are Committed

If sensitive information like a JWT secret is accidentally committed:

1. **Remove the secret immediately** from the repository and environment files
2. **Rotate the credentials** - generate new secrets/keys
3. **Check for other exposures** - make sure the secret wasn't included in other files
4. **Review commit history** - you may need to rewrite Git history to fully remove the secret

## Setting Up for Development

1. Copy `.env.example` to a new file called `.env`
2. Fill in the appropriate values for your development environment
3. Never commit your `.env` file to version control

## Adding New Environment Variables

When adding new environment variables:

1. Add the variable to `.env` for your local environment
2. Add a placeholder entry to `.env.example`
3. Document the variable in this guide
4. Update validation in `src/config/env.ts` if needed
