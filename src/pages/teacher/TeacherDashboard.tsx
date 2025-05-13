 import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  Book, 
  Briefcase, 
  FileText, 
  Star, 
  Wallet, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

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
    { name: 'Training Portal', icon: <Book />, section: 'training' },
    { name: 'Job Board', icon: <Briefcase />, section: 'jobs' },
    { name: 'My Applications', icon: <FileText />, section: 'applications' },
    { name: 'Resources', icon: <FileText />, section: 'resources' },
    { name: 'Feedback', icon: <Star />, section: 'feedback' },
    { name: 'Wallet & Earnings', icon: <Wallet />, section: 'wallet' },
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
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Welcome Message */}
      <div className="bg-white shadow rounded-lg p-6 col-span-full">
        <h2 className="text-2xl font-bold">Welcome, {user?.email}</h2>
        <p className="text-gray-600">Here's an overview of your teaching journey</p>
      </div>

      {/* Training Status Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Training Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-yellow-500 h-4 rounded-full" 
            style={{ width: '75%' }}
          ></div>
        </div>
        <p>75% Completed</p>
      </div>

      {/* Latest Job Posts */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Latest Job Posts</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Math Tutor - Secondary School</span>
            <button className="bg-black text-yellow-400 px-2 py-1 rounded">Apply</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Physics Tutor - High School</span>
            <button className="bg-black text-yellow-400 px-2 py-1 rounded">Apply</button>
          </div>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">This Month's Earnings</h3>
        <div className="text-3xl font-bold text-green-600">₦50,000</div>
        <p className="text-gray-600">Total Earnings</p>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
        <div className="flex items-center">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="ml-2 text-gray-600">(4.5/5)</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">"Excellent tutor, very patient and clear in explanations."</p>
      </div>
    </div>
  );
};

const TeacherDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const { logout } = useAuth();

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

export default TeacherDashboard;