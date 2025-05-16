import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Component that checks authentication status and redirects
 * users to appropriate dashboard after login
 */
const AuthRedirect: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [redirecting, setRedirecting] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Get stored redirect path if any
    const redirectPath = localStorage.getItem('redirectAfterLogin') || '/';
    localStorage.removeItem('redirectAfterLogin'); // Clean up
    
    // Get intended destination from location state if any
    const intendedDestination = location.state?.from;
    
    if (isAuthenticated && user) {
      const dashboardPaths = {
        teacher: '/teacher/dashboard',
        parent: '/parent/dashboard',
        school: '/school/dashboard',
        admin: '/admin/dashboard'
      };
      
      // Determine where to redirect
      const targetPath = intendedDestination || 
                         dashboardPaths[user.role as keyof typeof dashboardPaths] ||
                         redirectPath || 
                         '/';
      
      // Small delay for better UX
      const timer = setTimeout(() => {
        navigate(targetPath, { replace: true });
        setRedirecting(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setRedirecting(false);
    }
  }, [isAuthenticated, user, navigate, location]);
  
  if (redirecting) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FFC107] mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Redirecting...</h2>
          <p className="text-gray-600">Taking you to your dashboard</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, show options
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-8">
          You need to be logged in to access this page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/auth"
            className="px-6 py-2 bg-[#FFC107] text-black rounded-md hover:bg-[#FFD700] transition-colors"
          >
            Log In / Sign Up
          </Link>
          <Link
            to="/"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthRedirect;
