import React, { ReactNode } from 'react';
import Sidebar from '../teacher/Sidebar';

interface TeacherDashboardLayoutProps {
  children: ReactNode;
}

const TeacherDashboardLayout: React.FC<TeacherDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-16 md:ml-64 p-6 w-full min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;
