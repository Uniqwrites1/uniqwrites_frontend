import React from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    { name: 'Teacher', path: '/login/teacher' },
    { name: 'Parent/Guardian', path: '/login/parent' },
    { name: 'School Admin', path: '/SchoolServiceRequestForm' }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="bg-black text-yellow-400 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Uniqwrites Authentication</h1>
        
        <div className="space-y-4">
          {roles.map((role) => (
            <button
              key={role.name}
              onClick={() => navigate(role.path)}
              className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Login as {role.name}
            </button>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-yellow-300 text-sm">
            Looking for something specific? 
            <span 
              onClick={() => navigate('/services')} 
              className="ml-2 underline cursor-pointer hover:text-yellow-200"
            >
              Explore Services
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;