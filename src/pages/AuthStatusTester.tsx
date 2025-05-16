import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getDashboardUrl } from '../utils/authUtils';
import { UserRole } from '../context/AuthContext';

const AuthStatusTester: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const testRoles: UserRole[] = ['teacher', 'parent', 'school', 'admin'];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Authentication System Test</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Current Auth Status</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><span className="font-medium">Is Authenticated:</span> {isAuthenticated ? 'Yes' : 'No'}</p>
            {user && (
              <>
                <p className="mt-2"><span className="font-medium">User ID:</span> {user.id}</p>
                <p className="mt-2"><span className="font-medium">Email:</span> {user.email}</p>
                <p className="mt-2"><span className="font-medium">Role:</span> {user.role}</p>
                <p className="mt-2"><span className="font-medium">Dashboard URL:</span> {getDashboardUrl(user.role)}</p>
              </>
            )}
          </div>
          
          {isAuthenticated && (
            <button 
              onClick={logout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Log out
            </button>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Login Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testRoles.map(role => (
              <Link
                key={role}
                to={`/login/${role}`}
                className="bg-[#FFC107] text-black px-4 py-2 rounded text-center hover:bg-[#FFD700]"
              >
                Login as {role}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Signup Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testRoles.map(role => (
              <Link
                key={role}
                to={`/signup/${role}`}
                className="bg-black text-yellow-400 px-4 py-2 rounded text-center hover:bg-gray-800"
              >
                Signup as {role}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testRoles.map(role => (
              <Link
                key={role}
                to={getDashboardUrl(role)}
                className="border border-[#FFC107] text-gray-800 px-4 py-2 rounded text-center hover:bg-[#FFF8E1]"
              >
                {role} Dashboard
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthStatusTester;
