// Explicitly import React
import * as React from 'react';

// Error Handler Utility
export class ErrorHandler {
  // Log errors to a centralized logging service
  static logError(error: Error, context?: unknown): void {
    console.error('Uniqwrites Error:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      context
    });

    // In a real app, you'd send this to a logging service like Sentry
    // Sentry.captureException(error);
  }

  // User-friendly error messages
  static getUserFriendlyMessage(error: Error): string {
    switch(error.name) {
      case 'NetworkError':
        return 'Unable to connect. Please check your internet connection.';
      case 'AuthError':
        return 'Authentication failed. Please try again.';
      case 'ValidationError':
        return 'Invalid input. Please check your information.';
      default:
        return 'An unexpected error occurred. Please try again later.';
    }
  }

  // Error boundary for React components
  static createErrorBoundary(
    fallbackComponent?: React.ComponentType<{error: Error | null}>
  ): React.ComponentClass<{children: React.ReactNode}> {
    return class ErrorBoundary extends React.Component<
      { children: React.ReactNode }, 
      { hasError: boolean; error: Error | null }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
        return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        ErrorHandler.logError(error, errorInfo);
      }

      render(): React.ReactNode {
        if (this.state.hasError) {
          if (fallbackComponent) {
            const FallbackComponent = fallbackComponent;
            return React.createElement(FallbackComponent, { error: this.state.error });
          }
          return React.createElement('h1', null, 'Something went wrong.');
        }

        return this.props.children;
      }
    };
  }
}

// Generic error types
export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}