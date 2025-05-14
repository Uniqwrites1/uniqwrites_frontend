import React, { useState } from 'react';
import TeacherDashboardLayout from '../../components/layouts/TeacherDashboardLayout';

interface JobPost {
  id: string;
  title: string;
  description: string;
  subject: string;
  mode: 'Online' | 'Physical' | 'Hybrid';
  location: string;
  postedDate: string;
  salary: string;
}

const JobBoard: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const mockJobs: JobPost[] = [
    {
      id: '1',
      title: 'Mathematics Tutor for Secondary School',
      description: 'Looking for an experienced mathematics tutor for JSS1-3 students.',
      subject: 'Mathematics',
      mode: 'Online',
      location: 'Lagos',
      postedDate: '2 days ago',
      salary: '₦50,000 - ₦70,000 per month'
    },
    {
      id: '2',
      title: 'English Language Teacher',
      description: 'Need an English language teacher for primary school students.',
      subject: 'English',
      mode: 'Physical',
      location: 'Abuja',
      postedDate: '1 week ago',
      salary: '₦60,000 - ₦80,000 per month'
    },
    {
      id: '3',
      title: 'Science Tutor for Primary School',
      description: 'Science tutor needed for primary 4-6 students.',
      subject: 'Science',
      mode: 'Hybrid',
      location: 'Port Harcourt',
      postedDate: 'Today',
      salary: '₦45,000 - ₦65,000 per month'
    }
  ];

  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // In a real app, this would come from user state
  const isUserTrained = false;

  // Filter jobs based on selected criteria
  const filteredJobs = mockJobs.filter(job => {
    return (
      (subjectFilter === '' || job.subject === subjectFilter) &&
      (modeFilter === '' || job.mode === modeFilter) &&
      (locationFilter === '' || job.location === locationFilter)
    );
  });

  // Get unique values for filter dropdowns
  const subjects = [...new Set(mockJobs.map(job => job.subject))];
  const modes = [...new Set(mockJobs.map(job => job.mode))];
  const locations = [...new Set(mockJobs.map(job => job.location))];

  return (    
    <TeacherDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Teaching Opportunities</h1>
        <p className="text-gray-600 text-lg">Discover and apply for teaching positions that match your expertise</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-black">Filter Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Subject</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-1">Mode</label>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option value="">All Modes</option>
              {modes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-1">Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-yellow-400 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{job.title}</h3>
                  <p className="text-gray-600">{job.description}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">Posted: {job.postedDate}</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="bg-black bg-opacity-5 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Subject</p>
                  <p className="font-semibold text-black">{job.subject}</p>
                </div>
                <div className="bg-black bg-opacity-5 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Mode</p>
                  <p className="font-semibold text-black">{job.mode}</p>
                </div>
                <div className="bg-black bg-opacity-5 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-black">{job.location}</p>
                </div>
                <div className="bg-black bg-opacity-5 p-3 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Salary</p>
                  <p className="font-semibold text-black">{job.salary}</p>
                </div>
              </div>
              
              <div className="flex justify-end items-center mt-6">
                <button
                  disabled={!isUserTrained}              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    isUserTrained 
                      ? 'bg-yellow-400 text-black hover:bg-yellow-500 hover:shadow-lg' 
                      : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isUserTrained ? 'Apply Now' : 'Complete Training to Apply'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">No jobs match your filter criteria.</p>
          </div>
        )}
      </div>
    </TeacherDashboardLayout>
  );
};

export default JobBoard;
