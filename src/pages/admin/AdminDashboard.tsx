import React, { useState } from 'react';
import { 
  Home as HomeIcon, 
  UserCheck, 
  FileText, 
  Briefcase, 
  CreditCard, 
  Star, 
  Users, 
  Book,
  Settings, 
  Menu, 
  X,
  PenTool,
  BarChart2,
  Upload,
  Plus,
  Edit,
  Trash2
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
    { name: 'Blog Management', icon: <PenTool />, section: 'blog' },
    { name: 'Training Modules', icon: <Book />, section: 'training' },
    { name: 'Analytics', icon: <BarChart2 />, section: 'analytics' },
    { name: 'Teacher Approvals', icon: <UserCheck />, section: 'teachers' },
    { name: 'Job Management', icon: <Briefcase />, section: 'jobs' },
    { name: 'Payments', icon: <CreditCard />, section: 'payments' },
    { name: 'Feedback Monitor', icon: <Star />, section: 'feedback' },
    { name: 'User Management', icon: <Users />, section: 'users' },
    { name: 'Settings', icon: <Settings />, section: 'settings' }
  ];

  return (
    <div 
      className={`
        fixed md:static z-20 top-0 left-0 h-full w-64 bg-black text-yellow-400 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button 
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
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
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
              ${activeSection === item.section ? 'bg-yellow-500 bg-opacity-20' : ''}
            `}
            aria-current={activeSection === item.section ? 'page' : undefined}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

// Blog Management Section
const BlogSection = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Getting Started with Online Tutoring', status: 'published', date: '2025-05-12' },
    { id: 2, title: 'Tips for Effective Learning', status: 'draft', date: '2025-05-10' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <button 
          className="bg-black text-yellow-400 px-4 py-2 rounded-lg hover:bg-opacity-80 flex items-center gap-2"
          aria-label="Create new blog post"
        >
          <Plus size={20} />
          New Post
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {post.date} · {post.status}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  aria-label={`Edit ${post.title}`}
                >
                  <Edit size={20} />
                </button>
                <button 
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  aria-label={`Delete ${post.title}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Training Modules Section
const TrainingSection = () => {
  const [modules, setModules] = useState([
    { 
      id: 1, 
      title: 'Effective Online Teaching', 
      type: 'video',
      status: 'published',
      completions: 45
    },
    { 
      id: 2, 
      title: 'Student Engagement Strategies', 
      type: 'quiz',
      status: 'draft',
      completions: 0
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Training Modules</h2>
        <button 
          className="bg-black text-yellow-400 px-4 py-2 rounded-lg hover:bg-opacity-80 flex items-center gap-2"
          aria-label="Add new training module"
        >
          <Plus size={20} />
          New Module
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="space-y-4">
          {modules.map(module => (
            <div 
              key={module.id} 
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{module.title}</h3>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="capitalize">{module.type}</span>
                  <span>·</span>
                  <span>{module.status}</span>
                  <span>·</span>
                  <span>{module.completions} completions</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  aria-label={`Edit ${module.title}`}
                >
                  <Edit size={20} />
                </button>
                <button 
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  aria-label={`Delete ${module.title}`}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Analytics Section
const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Active Teachers</h3>
          <p className="text-3xl font-bold">156</p>
          <span className="text-green-500 text-sm">↑ 12% this month</span>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Total Students</h3>
          <p className="text-3xl font-bold">892</p>
          <span className="text-green-500 text-sm">↑ 8% this month</span>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Course Completions</h3>
          <p className="text-3xl font-bold">367</p>
          <span className="text-green-500 text-sm">↑ 15% this month</span>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-sm text-gray-500 mb-2">Revenue</h3>
          <p className="text-3xl font-bold">₦2.4M</p>
          <span className="text-green-500 text-sm">↑ 20% this month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Popular Subjects</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Mathematics</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>English</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">New teacher approved</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium">New training module published</p>
                <p className="text-sm text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)} 
        className="fixed top-4 left-4 z-30 md:hidden bg-black text-yellow-400 p-2 rounded"
        aria-label="Open menu"
      >
        <Menu />
      </button>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Content Area */}
        <main className="flex-grow p-4 md:p-8 ml-0 md:ml-64" role="main">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'blog' && <BlogSection />}
          {activeSection === 'training' && <TrainingSection />}
          {activeSection === 'analytics' && <AnalyticsSection />}
          {/* Add other section components here */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;