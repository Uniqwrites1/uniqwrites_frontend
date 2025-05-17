import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../context/AuthContext';
import { getDashboardUrl } from '../utils/authUtils';
import { authService } from '../services/authService';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';

const RoleLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const { role } = useParams<{ role: string }>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const validRole = role as UserRole;
  
  // Extract destination from location state (if provided)
  const targetDashboard = location.state?.targetDashboard;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validRole) {
      setError('Invalid role');
      return;
    }
    
    try {
      await login(email, password, validRole);
      
      // After successful login, navigate to the target dashboard or the default dashboard for the role
      if (targetDashboard) {
        navigate(targetDashboard);
      } else {
        // Use the utility function to get the appropriate dashboard URL
        navigate(getDashboardUrl(validRole));
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed:', error);
    }
  };

  const handleGoogleSuccess = () => {
    // This is handled inside the GoogleLoginButton component
    setError('');
  };

  const handleGoogleError = (errorMessage: string) => {
    setError(errorMessage);
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!forgotPasswordEmail) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      // Call the password reset API
      await authService.sendPasswordResetEmail(forgotPasswordEmail);
      setShowForgotPassword(false);
      // Show success message
      setForgotPasswordSuccess(true);
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      console.error('Forgot password failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="bg-black text-yellow-400 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login` : 'Login'}
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        {forgotPasswordSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            Password reset instructions have been sent to your email.
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Login
          </button>
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(true);
                setForgotPasswordSuccess(false);
              }}
              className="text-yellow-300 text-sm underline hover:text-yellow-200"
            >
              Forgot Password?
            </button>
          </div>
        </form>

        {/* Forgot Password Form */}
        {showForgotPassword && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <h3 className="text-xl font-semibold mb-3 text-center">Reset Password</h3>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                className="w-full p-3 rounded bg-gray-700 text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full bg-transparent border border-yellow-400 text-yellow-400 py-2 rounded-lg hover:bg-yellow-400 hover:bg-opacity-10 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="text-center mt-4">
          <p className="text-yellow-300 text-sm mb-2">Or login with</p>
          <GoogleLoginButton 
            role={validRole} 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />
        </div>

        <div className="text-center mt-6">
          <p className="text-yellow-300 text-sm">
            Don't have an account? 
            <span 
              onClick={() => navigate(`/signup/${role}`)} 
              className="ml-2 underline cursor-pointer hover:text-yellow-200"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleLogin;