import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SignupData, UserRole } from '../context/AuthContext';

interface LocationState {
  prefilledData?: {
    emailAddress?: string;
    [key: string]: any;
  };
  source?: string;
}

const RoleSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { role } = useParams<{ role: string }>();
  const location = useLocation();
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Check if there's prefilled data from previous form
  useEffect(() => {
    if (location.state) {
      const { prefilledData, source } = location.state as LocationState;
      
      // Prefill email if available
      if (prefilledData?.emailAddress) {
        setEmail(prefilledData.emailAddress);
      }
      
      // Optional: Add some feedback about the source of signup
      if (source) {
        console.log(`Signup initiated from: ${source}`);
      }
    }
  }, [location.state]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError("Invalid role");
      return;
    }

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const validRole = role as UserRole;
      await signup({
        email,
        password,
        role: validRole,
        profile: {}
      });
      
      // After successful signup, navigate based on role
      switch(validRole) {
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'parent':
          navigate('/parent/dashboard');
          break;
        case 'school':
          navigate('/school/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      setError(errorMessage);
      console.error('Signup failed:', error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const success = await loginWithGoogle(role as any);
      
      if (success) {
        // Navigate to respective dashboard based on role
        switch(role) {
          case 'teacher':
            navigate('/teacher/dashboard');
            break;
          case 'parent':
            navigate('/parent/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Google signup failed');
      }
    } catch (error) {
      setError('Google signup failed');
      console.error('Google Signup failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="bg-black text-yellow-400 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          {role?.charAt(0).toUpperCase() + role?.slice(1)} Signup
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-yellow-300 text-sm mb-2">Or sign up with</p>
          <button
            onClick={handleGoogleSignup}
            className="w-full bg-white text-black py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.002-.001 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-yellow-300 text-sm">
            Already have an account? 
            <span 
              onClick={() => navigate(`/login/${role}`)} 
              className="ml-2 underline cursor-pointer hover:text-yellow-200"
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