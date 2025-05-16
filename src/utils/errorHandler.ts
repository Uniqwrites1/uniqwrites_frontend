import React from 'react';
import { AxiosError } from 'axios';

// Basic error types
export class APIError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network error occurred') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthError extends Error {
  constructor(message = 'Authentication error occurred') {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Error Handler Utility
export class ErrorHandler {
  static logError(error: Error | unknown, context?: string): void {
    const errorDetails = {
      timestamp: new Date().toISOString(),
      context,
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'UnknownError',
      stack: error instanceof Error ? error.stack : undefined,
    };

    // In development, log to console
    if (import.meta.env.DEV) {
      console.error('[Error]:', errorDetails);
    }
  }

  static getUserFriendlyMessage(error: Error | unknown): string {
    if (error instanceof NetworkError) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error instanceof AuthError) {
      return 'Your session has expired. Please login again.';
    }
    if (error instanceof ValidationError) {
      return `Invalid input: ${error.message}`;
    }
    if (error instanceof APIError) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again later.';
  }

  // Error Boundary Creator
  static createErrorBoundary(FallbackComponent: React.ComponentType<{ error: Error | null }>): React.ComponentClass<{ children: React.ReactNode }> {
    return class ErrorBoundary extends React.Component<
      { children: React.ReactNode },
      { error: Error | null }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { error: null };
      }

      static getDerivedStateFromError(error: Error) {
        return { error };
      }      // Using React.ErrorInfo but only needing the error parameter
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
        ErrorHandler.logError(error, 'React Error Boundary');
      }

      render() {
        if (this.state.error) {
          return React.createElement(FallbackComponent, { error: this.state.error });
        }
        return this.props.children;
      }
    };
  }
}

// API Error Handler
export const handleAPIError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    throw new APIError(message, error.response?.status, error.response?.data?.code);
  }

  if (error instanceof Error) {
    throw new APIError(error.message);
  }

  throw new APIError('An unexpected error occurred');
};
