# Uniqwrites Frontend

This repository contains the frontend code for the Uniqwrites educational platform.

## Project Overview

Uniqwrites is an educational platform connecting teachers, parents, and schools. The platform facilitates educational services including tutoring, curriculum development, and educational resources.

## Technology Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context API
- **API Integration**: Axios
- **Authentication**: JWT-based authentication
- **Database**: PostgreSQL (accessed via API)

## Environment Configuration

The application uses environment variables for configuration. Create a `.env` file in the project root with the following variables:

```
# API Configuration
VITE_API_URL=/api

# Authentication
VITE_JWT_SECRET=your-jwt-secret

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

## Development

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Access to backend API

### Running the Development Server

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Authentication

The application uses JWT-based authentication with optional Google OAuth integration. See `src/docs/AuthenticationGuide.md` for detailed information.

## API Integration

The application connects to a PostgreSQL database through API endpoints. See `src/docs/APIUsageGuide.md` for detailed information about API usage.

## Building for Production

```bash
npm run build
```

## Recent Updates

### Authentication Improvements (May 2025)

- **Forgot Password**: Added password reset functionality with email-based recovery
- **Google OAuth**: Implemented Google login and registration using `@react-oauth/google`
- **Token Management**: Standardized token handling and storage with improved security
- **Error Handling**: Enhanced error feedback for authentication operations

### UI Enhancements

- **Dashboard Layout**: Fixed logout button positioning in dashboards with better flexbox layout
- **Responsive Design**: Improved mobile responsiveness throughout the application

### Backend Integration

- **API Standardization**: Updated all endpoints to use the `/api/resource` pattern
- **Authentication Flow**: Enhanced token-based authentication with proper refresh mechanisms
- **Direct Database**: Removed Supabase dependencies in favor of direct PostgreSQL access via API

For detailed implementation information, see `docs/implementation-summary.md`.
