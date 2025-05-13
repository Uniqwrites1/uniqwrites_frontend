import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  UserCheck, 
  FileText, 
  Briefcase, 
  CreditCard, 
  Star, 
  Users, 
  PlusCircle, 
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
    { name: 'Overview', icon: <HomeIcon />, section: 'overview' },
    { name: 'Approve Teachers', icon: <UserCheck />, section: 'teachers' },
    { name: 'Manage Requests', icon: <FileText />, section: 'requests' },
    { name: 'Assign Jobs', icon: <Briefcase />, section: 'jobs' },
    { name: 'Payments Dashboard', icon: <CreditCard />, section: 'payments' },
    { name: 'Feedback Monitoring', icon: <Star />, section: 'feedback' },
    { name: 'Post Initiative', icon: <PlusCircle />, section: 'initiatives' },
    { name: 'User Management', icon: <Users />, section: 'users' },
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
const OverviewSection = () => {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Pending Approvals */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Pending Approvals</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Teacher Applications</span>
            <span className="bg-yellow-500 text-white px-2 py-1 rounded">5</span>
          </div>
          <div className="flex justify-between items-center">
            <span>School Requests</span>
            <span className="bg-yellow-500 text-white px-2 py-1 rounded">3</span>
          </div>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
        <div className="text-3xl font-bold text-green-600">₦500,000</div>
        <p className="text-gray-600">This Month</p>
      </div>

      {/* Active Teaching Assignments */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Active Assignments</h3>
        <div className="text-2xl font-bold">42</div>
        <p className="text-gray-600">Ongoing Tutoring Jobs</p>
      </div>

      {/* Quick Search */}
      <div className="bg-white shadow rounded-lg p-6 col-span-full">
        <h3 className="text-xl font-semibold mb-4">Quick Search</h3>
        <input 
          type="text" 
          placeholder="Search users, jobs, requests..." 
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
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
        {activeSection === 'overview' && <OverviewSection />}
        {/* Add other section components here */}
      </main>
    </div>
  );
};

export default AdminDashboard;