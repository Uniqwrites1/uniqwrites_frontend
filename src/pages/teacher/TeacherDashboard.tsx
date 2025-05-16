import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Book, 
  Briefcase, 
  FileText, 
  Star, 
  Wallet, 
  Settings, 
  Menu, 
  X,
  Upload,
  Youtube 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
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
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Implementation for logout function will be added here
  // when the UI components are ready

  const sidebarItems = [
    { name: 'Dashboard', icon: <HomeIcon />, section: 'dashboard' },
    { name: 'Training Portal', icon: <Book />, section: 'training' },
    { name: 'Job Board', icon: <Briefcase />, section: 'jobs' },
    { name: 'Upload Resources', icon: <Upload />, section: 'resources' },
    { name: 'Feedback & Ratings', icon: <Star />, section: 'feedback' },
    { name: 'Wallet & Earnings', icon: <Wallet />, section: 'wallet' },
    { name: 'My Applications', icon: <FileText />, section: 'applications' },
    { name: 'Settings', icon: <Settings />, section: 'settings' }
  ];

  return (
    <div className={`
      fixed md:static z-20 top-0 left-0 h-full w-64 bg-black text-yellow-400 
      transform transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="flex justify-between items-center p-4 md:hidden">
        <h2 className="text-xl font-bold">Menu</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="text-yellow-400" />
        </button>
      </div>
      <nav className="mt-8 flex-grow">
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
      
      {/* Logout Button - positioned with margin-top auto to push it to the bottom without absolute positioning */}
      <div className="w-full p-4 border-t border-yellow-900 mt-auto">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center px-4 py-3 text-red-500 hover:bg-red-100 hover:bg-opacity-20 transition-colors rounded"
        >
          <span className="mr-3">🚪</span>
          <span>Logout</span>
        </button>
      </div>
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

// Training Portal Section
const TrainingPortalSection = () => {
  const modules = [
    { id: 1, title: 'Teaching Fundamentals', progress: 100 },
    { id: 2, title: 'Digital Learning Tools', progress: 80 },
    { id: 3, title: 'Student Engagement', progress: 60 },
    { id: 4, title: 'Assessment Strategies', progress: 30 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Training Portal</h2>
        <div className="space-y-6">
          {modules.map(module => (
            <div key={module.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{module.title}</h3>
                <span className="text-sm text-yellow-400">{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <button 
                className={`mt-2 text-sm ${
                  module.progress === 100 
                    ? 'text-green-600' 
                    : 'text-yellow-400 hover:text-yellow-500'
                }`}
              >
                {module.progress === 100 ? 'Completed' : 'Continue Training →'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Job Board Section
const JobBoardSection = () => {
  const jobs = [
    {
      id: 1,
      title: 'Mathematics Tutor',
      location: 'Lagos',
      mode: 'Hybrid',
      salary: '₦50,000 - ₦70,000',
      posted: '2 days ago',
      description: 'Looking for an experienced mathematics tutor for JSS1-3 students.'
    },
    {
      id: 2,
      title: 'English Language Teacher',
      location: 'Abuja',
      mode: 'Online',
      salary: '₦60,000 - ₦80,000',
      posted: '1 day ago',
      description: 'Need an English language teacher for primary school students.'
    }
  ];

  const [filters, setFilters] = useState({
    location: '',
    mode: '',
    subject: ''
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Job Board</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select 
            className="border rounded p-2"
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          >
            <option value="">All Locations</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
          </select>
          
          <select 
            className="border rounded p-2"
            value={filters.mode}
            onChange={(e) => setFilters(prev => ({ ...prev, mode: e.target.value }))}
          >
            <option value="">All Modes</option>
            <option value="online">Online</option>
            <option value="physical">Physical</option>
            <option value="hybrid">Hybrid</option>
          </select>
          
          <select 
            className="border rounded p-2"
            value={filters.subject}
            onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
          >
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="english">English</option>
            <option value="science">Science</option>
          </select>
        </div>
        
        {/* Job Listings */}
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span>{job.location}</span>
                <span>{job.mode}</span>
                <span>{job.salary}</span>
              </div>
              <p className="mt-2 text-gray-700">{job.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">Posted {job.posted}</span>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Resource Upload Section
const ResourceUploadSection = () => {
  const [uploadType, setUploadType] = useState<'document' | 'video'>('document');
  const [files, setFiles] = useState<File[]>([]);
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement file upload logic here
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Upload Learning Resources</h2>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setUploadType('document')}
            className={`flex items-center px-6 py-3 rounded-lg ${
              uploadType === 'document' 
                ? 'bg-yellow-400 text-black' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FileText className="mr-2" />
            Documents
          </button>
          <button
            onClick={() => setUploadType('video')}
            className={`flex items-center px-6 py-3 rounded-lg ${
              uploadType === 'video' 
                ? 'bg-yellow-400 text-black' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Youtube className="mr-2" />
            Video Link
          </button>
        </div>
        
        <form onSubmit={handleUpload} className="space-y-4">
          {uploadType === 'document' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-yellow-400"
            >
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p>Drag and drop files here or click to browse</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
              {files.length > 0 && (
                <div className="mt-4">
                  {files.map(file => (
                    <div key={file.name} className="text-sm text-gray-600">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Enter YouTube or Vimeo video link"
              className="w-full p-3 border rounded-lg"
            />
          )}
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description of your resource..."
            className="w-full p-3 border rounded-lg h-32"
          />
          
          <button 
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500"
          >
            Upload Resource
          </button>
        </form>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">My Uploaded Resources</h3>
        <div className="space-y-4">
          {/* Example resources */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Mathematics Study Guide.pdf</h4>
                <p className="text-sm text-gray-600">Uploaded 2 days ago</p>
              </div>
              <button className="text-red-600 hover:text-red-700">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Feedback Section
const FeedbackSection = () => {
  const feedbacks = [
    {
      id: 1,
      studentName: 'John D.',
      rating: 5,
      comment: 'Excellent teacher, very patient and methodical in explanations.',
      date: '2023-05-10'
    },
    {
      id: 2,
      studentName: 'Sarah M.',
      rating: 4,
      comment: 'Good teaching style, helped me understand difficult concepts.',
      date: '2023-05-08'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Student Feedback</h2>
        
        {/* Overall Rating */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-yellow-500 mr-2">4.5</div>
            <div className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={star <= 4.5 ? 'fill-current' : 'stroke-current'}
                  size={20}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 mt-1">Based on 24 reviews</p>
        </div>
        
        {/* Individual Feedbacks */}
        <div className="space-y-4">
          {feedbacks.map(feedback => (
            <div key={feedback.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{feedback.studentName}</h4>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={i < feedback.rating ? 'fill-current' : 'stroke-current'}
                        size={16}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{feedback.date}</span>
              </div>
              <p className="text-gray-700">{feedback.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Wallet Section
const WalletSection = () => {
  const transactions = [
    {
      id: 1,
      type: 'Credit',
      amount: 15000,
      description: 'Mathematics tutoring - 5 sessions',
      date: '2023-05-10'
    },
    {
      id: 2,
      type: 'Credit',
      amount: 12000,
      description: 'Physics tutoring - 4 sessions',
      date: '2023-05-08'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Balance Summary */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Wallet Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-black font-medium">Available Balance</h3>
            <p className="text-2xl font-bold text-black mt-1">₦50,000</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-black font-medium">This Month</h3>
            <p className="text-2xl font-bold text-black mt-1">₦27,000</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm text-black font-medium">Total Earned</h3>
            <p className="text-2xl font-bold text-black mt-1">₦150,000</p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div key={transaction.id} className="flex justify-between items-start p-4 border rounded-lg">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className={`font-bold ${
                transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'Credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// My Applications Section
const MyApplicationsSection = () => {
  const applications = [
    {
      id: 1,
      position: 'Mathematics Tutor',
      school: 'ABC International School',
      status: 'Pending',
      appliedDate: '2023-05-10'
    },
    {
      id: 2,
      position: 'Physics Teacher',
      school: 'XYZ Academy',
      status: 'Accepted',
      appliedDate: '2023-05-05'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Applications</h2>
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{app.position}</h3>
                  <p className="text-sm text-gray-600">{app.school}</p>
                  <p className="text-sm text-gray-500">Applied: {app.appliedDate}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  app.status === 'Accepted' 
                    ? 'bg-green-100 text-green-800'
                    : app.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Settings Section
const SettingsSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        {/* Profile Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                placeholder="Your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                placeholder="Your phone number"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">Receive updates via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              </label>
            </div>
          </div>
        </div>

        <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const TeacherDashboard: React.FC = () => {
  // We'll use these hooks when implementing logout functionality
  // const { logout } = useAuth();
  // const navigate = useNavigate();
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
        {activeSection === 'training' && <TrainingPortalSection />}
        {activeSection === 'jobs' && <JobBoardSection />}
        {activeSection === 'resources' && <ResourceUploadSection />}
        {activeSection === 'feedback' && <FeedbackSection />}
        {activeSection === 'wallet' && <WalletSection />}
        {activeSection === 'applications' && <MyApplicationsSection />}
        {activeSection === 'settings' && <SettingsSection />}
      </main>
    </div>
  );
};

const TeacherDashboardWithLayout = () => {
  return (
    <DashboardLayout requiredRole="teacher">
      <TeacherDashboard />
    </DashboardLayout>
  );
};

export default TeacherDashboardWithLayout;