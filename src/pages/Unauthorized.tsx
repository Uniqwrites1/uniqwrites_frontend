import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Shield } from 'lucide-react';

interface LocationState {
  attemptedRoute?: string;
  currentRole?: string;
}

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get state from location
  const state = location.state as LocationState;

  const handleGoBack = () => {
    navigate(-1);
  };

  // Determine the appropriate home page based on user role
  const getHomePage = () => {
    if (!user) return '/auth';

    switch (user.role) {
      case 'teacher':
        return '/teacher/dashboard';
      case 'parent':
        return '/parent/dashboard';
      case 'school':
        return '/school/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Shield className="text-red-500" size={64} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>        <h2 className="text-xl font-semibold text-gray-700 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this page.
        </p>
        {state?.currentRole && (
          <p className="text-gray-600 mb-8">
            Your current role is <span className="font-semibold">{state.currentRole}</span> which doesn't have access to this resource.
          </p>
        )}
        {!user && (
          <p className="text-gray-600 mb-8">
            Please log in with the appropriate credentials.
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
          <Link
            to={getHomePage()}
            className="px-6 py-2 bg-[#FFC107] text-black rounded-md hover:bg-[#FFD700] transition-colors"
          >
            {user ? 'Go to Dashboard' : 'Log In'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
