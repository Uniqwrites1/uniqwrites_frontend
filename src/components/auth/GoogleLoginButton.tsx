import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../context/AuthContext';

interface GoogleLoginButtonProps {
  role: UserRole;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ role, onSuccess, onError }) => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      setIsLoading(true);
      // Get the ID token from the credential response
      const { credential } = credentialResponse;
      
      if (!credential) {
        throw new Error('No credential received from Google');
      }

      // Call the loginWithGoogle function from AuthContext with the Google credential
      const success = await loginWithGoogle(role, credential);
      
      if (success) {
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Navigate based on role if no callback provided
          const dashboardPath = role === 'teacher' 
            ? '/teacher-dashboard' 
            : role === 'parent' 
            ? '/parent-dashboard' 
            : role === 'school' 
            ? '/school-dashboard' 
            : '/dashboard';
          
          navigate(dashboardPath);
        }
      }
    } catch (error) {
      console.error('Google login failed:', error);
      
      if (onError) {
        onError(error instanceof Error ? error.message : 'Google login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    const errorMessage = 'Google login failed or was cancelled by the user';
    console.error(errorMessage);
    
    if (onError) {
      onError(errorMessage);
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="w-full py-3 flex justify-center items-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          <span className="ml-3 text-gray-700">Connecting...</span>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
          theme="filled_black"
          shape="rectangular"
          text="continue_with"
          locale="en"
          width="100%"
        />
      )}
    </div>
  );
};

export default GoogleLoginButton;
