import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../context/AuthContext';
import { getDashboardUrl } from '../utils/authUtils';
import { authService } from '../services/authService';

const RoleLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { role } = useParams<{ role: string }>();
  const { login, loginWithGoogle } = useAuth();
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

  const handleGoogleLogin = async () => {
    try {
      const success = await loginWithGoogle(role as UserRole);
      
      if (success) {
        // After successful login, navigate to the target dashboard or the default dashboard for the role
        if (targetDashboard) {
          navigate(targetDashboard);
        } else {
          // Use the utility function to get the appropriate dashboard URL
          navigate(getDashboardUrl(role as UserRole));
        }
      } else {
        setError('Google login failed');
      }
    } catch (error) {
      setError('Google login failed');
      console.error('Google Login failed', error);
    }
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
      alert('Password reset instructions have been sent to your email');
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
              onClick={() => setShowForgotPassword(true)}
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
          <button
            onClick={handleGoogleLogin}
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