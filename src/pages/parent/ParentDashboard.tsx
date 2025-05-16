import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Book, 
  FileText, 
  Star, 
  CreditCard, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

// Sidebar Component
const Sidebar = ({ 
  isOpen, 
  setIsOpen, 
  activeSection, 
  setActiveSection 
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  const sidebarItems = [
    { name: 'Dashboard', icon: <HomeIcon />, section: 'dashboard' },
    { name: 'Book Services', icon: <Book />, section: 'book-services' },
    { name: 'Track Progress', icon: <FileText />, section: 'track-progress' },
    { name: 'Feedback & Ratings', icon: <Star />, section: 'feedback' },
    { name: 'Payment History', icon: <CreditCard />, section: 'payments' },
    { name: 'Settings', icon: <Settings />, section: 'settings' }
  ];

  return (
    <div className={`
      fixed md:static z-20 top-0 left-0 h-full w-64 bg-black text-yellow-400 
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="text-yellow-400" />
        </button>
      </div>
      <nav className="mt-8">
        {sidebarItems.map((item) => (
          <button
            key={item.section}
            onClick={() => setActiveSection(item.section)}
            className={`
              w-full flex items-center p-4 hover:bg-yellow-500 hover:bg-opacity-20
              ${activeSection === item.section ? 'bg-yellow-500 bg-opacity-20' : ''}
            `}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Dashboard Sections
const DashboardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Welcome Message */}
      <div className="bg-white shadow rounded-lg p-6 col-span-full">
        <h2 className="text-2xl font-bold">Welcome, Mrs. Ayo</h2>
        <p className="text-gray-600">Here's an overview of your child's learning journey</p>
      </div>

      {/* Active Requests Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Active Requests</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Mathematics Tutoring</span>
            <span className="text-yellow-500">In Progress</span>
          </div>
          <div className="flex justify-between items-center">
            <span>English Language</span>
            <span className="text-green-500">Confirmed</span>
          </div>
        </div>
      </div>

      {/* Child's Progress Snapshot */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Progress Snapshot</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-yellow-500 h-4 rounded-full" 
            style={{ width: '65%' }}
          ></div>
        </div>
        <p>65% Overall Progress</p>
        <p className="text-sm text-gray-600">Last updated: 2 days ago</p>
      </div>

      {/* Recent Payments */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Payments</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Mathematics Tutor</span>
            <span className="text-green-600">₦15,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span>English Language Tutor</span>
            <span className="text-green-600">₦12,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)} 
        className="fixed top-4 left-4 z-30 md:hidden bg-black text-yellow-400 p-2 rounded"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 ml-0 md:ml-64">
        {activeSection === 'dashboard' && <DashboardSection />}
        {/* Add other section components here */}
      </main>
    </div>
  );
};

const ParentDashboardWithLayout = () => {
  return (
    <DashboardLayout requiredRole="parent">
      <ParentDashboard />
    </DashboardLayout>
  );
};

export default ParentDashboardWithLayout;