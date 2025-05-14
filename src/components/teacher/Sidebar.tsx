import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, BookOpen, Briefcase, FileText, 
  Book, MessageSquare, Wallet, Settings, ChevronLeft, ChevronRight 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/teacher/dashboard' },
    { name: 'Training Portal', icon: <BookOpen size={20} />, path: '/teacher/training' },
    { name: 'Job Board', icon: <Briefcase size={20} />, path: '/teacher/job-board' },
    { name: 'My Applications', icon: <FileText size={20} />, path: '/teacher/applications' },
    { name: 'Resources', icon: <Book size={20} />, path: '/teacher/resources' },
    { name: 'Feedback', icon: <MessageSquare size={20} />, path: '/teacher/feedback' },
    { name: 'Wallet & Earnings', icon: <Wallet size={20} />, path: '/teacher/wallet' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/teacher/settings' },
  ];

  return (
    <aside 
      className={`bg-black text-yellow-400 h-screen transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      } fixed left-0 top-0`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        {isExpanded && <h2 className="font-bold text-lg">Teacher Portal</h2>}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                to={item.path}
                className="flex items-center px-4 py-3 hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                {isExpanded && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
