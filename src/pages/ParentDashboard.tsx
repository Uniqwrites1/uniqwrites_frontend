import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Book, 
  Star, 
  MessageSquare, 
  Settings,
  Menu,
  X 
} from 'lucide-react';

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
    { name: 'Learning Resources', icon: <Book />, section: 'resources' },
    { name: 'Feedback & Ratings', icon: <Star />, section: 'feedback' },
    { name: 'Messages', icon: <MessageSquare />, section: 'messages' },
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

// Dashboard Sections
const OverviewSection = () => {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Next Session</h3>
        <div className="space-y-2">
          <p className="text-gray-600">Mathematics</p>
          <p className="font-medium">Tomorrow at 2:00 PM</p>
          <p className="text-sm text-gray-500">with Mr. John Doe</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Resources</h3>
        <div className="space-y-2">
          <p className="text-blue-600 hover:underline cursor-pointer">Math Practice Sheet</p>
          <p className="text-blue-600 hover:underline cursor-pointer">English Homework</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Last Session Rating</h3>
        <div className="flex text-yellow-500">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              className="fill-current"
              size={20}
            />
          ))}
        </div>
        <p className="mt-2 text-gray-600">Great session!</p>
      </div>
    </div>
  );
};

const ResourcesSection = () => {
  const resources = [
    { id: 1, name: 'Mathematics Practice Set', type: 'PDF', date: '2025-05-12', tutor: 'John Doe' },
    { id: 2, name: 'English Grammar Video', type: 'Video', date: '2025-05-11', tutor: 'Jane Smith' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
        <div className="space-y-4">
          {resources.map(resource => (
            <div 
              key={resource.id} 
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              role="article"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{resource.name}</h3>
                  <p className="text-sm text-gray-600">Uploaded by: {resource.tutor}</p>
                  <p className="text-sm text-gray-500">Date: {resource.date}</p>
                </div>
                <button 
                  className="bg-black text-yellow-400 px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
                  aria-label={`Download ${resource.name}`}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeedbackSection = () => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Session Feedback</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rate your last session
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                aria-label={`Rate ${star} stars`}
              >
                <Star 
                  className={`${rating >= star ? 'fill-current text-yellow-500' : 'text-gray-300'}`}
                  size={24}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label 
            htmlFor="feedback" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Comments
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            rows={4}
            placeholder="Share your thoughts about the session..."
          />
        </div>

        <button 
          className="bg-black text-yellow-400 px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
        >
          Submit Feedback
        </button>
      </div>

      {/* Previous Feedback History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Previous Feedback</h3>
        <div className="space-y-4">
          {/* Example feedback entries */}
          <div className="border-b pb-4">
            <div className="flex text-yellow-500 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="fill-current" size={16} />
              ))}
            </div>
            <p className="text-gray-700">Great session! Very helpful with math problems.</p>
            <p className="text-sm text-gray-500 mt-1">May 10, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessagesSection = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Messages</h2>
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="font-medium">From: John Doe (Math Tutor)</h3>
            <p className="text-gray-600 mt-1">Here's the homework for next week's session...</p>
            <p className="text-sm text-gray-500 mt-2">May 12, 2025</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsSection = () => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-6">Settings</h2>
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox text-yellow-400 rounded" />
            <span>Email notifications for new resources</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="form-checkbox text-yellow-400 rounded" />
            <span>Session reminders</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const ParentDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  
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
          {activeSection === 'resources' && <ResourcesSection />}
          {activeSection === 'feedback' && <FeedbackSection />}
          {activeSection === 'messages' && <MessagesSection />}
          {activeSection === 'settings' && <SettingsSection />}
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;