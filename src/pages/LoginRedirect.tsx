import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the authentication page
    navigate('/auth');
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFC107]"></div>
      <p className="ml-4">Redirecting to login options...</p>
    </div>
  );
};

export default LoginRedirect;
