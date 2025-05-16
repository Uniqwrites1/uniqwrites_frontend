import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../context/AuthContext';
import { getDashboardUrl } from '../utils/authUtils';

interface LocationState {
  prefilledData?: {
    emailAddress?: string;
    [key: string]: string | undefined;
  };
  source?: string;
  from?: string;
  targetDashboard?: string;
}

interface GoogleIconProps {
  className?: string;
}

const GoogleIcon: React.FC<GoogleIconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.002-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

const RoleSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useParams<{ role: string }>();
  const location = useLocation();
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Extract destination from location state (if provided)
  const targetDashboard = location.state?.targetDashboard;
  
  useEffect(() => {
    if (location.state) {
      const { prefilledData, source } = location.state as LocationState;
      if (prefilledData?.emailAddress) {
        setEmail(prefilledData.emailAddress);
      }
      if (source) {
        console.log(`Signup initiated from: ${source}`);
      }
    }
  }, [location.state]);

  const validateForm = () => {
    if (!role) {
      setError("Invalid role");
      return false;
    }

    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const validRole = role as UserRole;
      
      const profile = {
        firstName: '',
        lastName: '',
        role: validRole,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await signup({
        email,
        password,
        role: validRole,
        profile
      });
      
      // Navigate to the target dashboard or default dashboard for the role
      navigate(targetDashboard || getDashboardUrl(validRole));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      setError(errorMessage);
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!role) {
      setError("Invalid role");
      return;
    }

    setIsLoading(true);

    try {
      await loginWithGoogle(role as UserRole);
      
      // Navigate to the target dashboard or default dashboard for the role
      navigate(targetDashboard || getDashboardUrl(role as UserRole));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google signup failed';
      setError(errorMessage);
      console.error('Google Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const capitalizedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : '';

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="bg-black text-yellow-400 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          {capitalizedRole} Signup
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-yellow-300 text-sm mb-2">Or sign up with</p>
          <button
            onClick={handleGoogleSignup}
            className={`w-full bg-white text-black py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-yellow-300 text-sm">
            Already have an account? 
            <span 
              onClick={() => !isLoading && navigate(`/login/${role}`)} 
              className={`ml-2 underline cursor-pointer hover:text-yellow-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSignup;