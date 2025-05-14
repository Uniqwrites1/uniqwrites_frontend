import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  header?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarContent, header }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside 
        className={`fixed left-0 top-0 h-full bg-black text-yellow-400 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } z-30`}
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 64 }}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute right-0 top-4 transform translate-x-1/2 bg-black text-yellow-400 p-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg 
            className={`w-4 h-4 transform ${isSidebarOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Sidebar Content */}
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {sidebarContent}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {/* Header */}
        {header && (
          <header className="bg-white shadow-sm py-4 px-6">
            {header}
          </header>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
