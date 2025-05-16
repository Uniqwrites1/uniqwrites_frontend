import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Authentication: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from state if it exists
  const from = location.state?.from || '/';

  const roles = [
    { name: 'Teacher', path: '/login/teacher', dashboardPath: '/teacher/dashboard' },
    { name: 'Parent/Guardian', path: '/login/parent', dashboardPath: '/parent/dashboard' },
    { name: 'School Admin', path: '/login/school', dashboardPath: '/school/dashboard' },
    { name: 'Admin', path: '/login/admin', dashboardPath: '/admin/dashboard' }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="bg-black text-yellow-400 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Uniqwrites Authentication</h1>
        
        <div className="space-y-4">
          {roles.map((role) => (
            <button
              key={role.name}
              onClick={() => navigate(role.path, { state: { from, targetDashboard: role.dashboardPath } })}
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