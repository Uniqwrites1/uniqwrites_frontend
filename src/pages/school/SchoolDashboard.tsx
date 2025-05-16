import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';

const SchoolDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">School Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Service Requests</h2>
            <p className="text-gray-600 mb-4">
              View and manage your service requests with Uniqwrites.
            </p>
            <button className="bg-[#FFC107] text-black px-4 py-2 rounded hover:bg-[#FFD700]">
              View Requests
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Teacher Recruitment</h2>
            <p className="text-gray-600 mb-4">
              Browse available teachers for your institution.
            </p>
            <button className="bg-[#FFC107] text-black px-4 py-2 rounded hover:bg-[#FFD700]">
              Find Teachers
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">School Profile</h2>
            <p className="text-gray-600 mb-4">
              Update your school's information and preferences.
            </p>
            <button className="bg-[#FFC107] text-black px-4 py-2 rounded hover:bg-[#FFD700]">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SchoolDashboardWithLayout = () => {
  return (
    <DashboardLayout requiredRole="school">
      <SchoolDashboard />
    </DashboardLayout>
  );
};

export default SchoolDashboardWithLayout;