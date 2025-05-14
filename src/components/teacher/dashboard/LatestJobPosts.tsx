import React from 'react';
import { Link } from 'react-router-dom';

interface JobPost {
  id: string;
  title: string;
  mode: 'Online' | 'Physical' | 'Hybrid';
  location: string;
  postedDate: string;
}

interface LatestJobPostsProps {
  jobs: JobPost[];
  isUserTrained: boolean;
}

const LatestJobPosts: React.FC<LatestJobPostsProps> = ({ jobs, isUserTrained }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Latest Job Posts</h3>
        <Link 
          to="/teacher/job-board" 
          className="text-yellow-400 text-sm hover:text-yellow-500"
        >
          View all jobs →
        </Link>
      </div>
      
      <div className="space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="border-b pb-4 last:border-b-0 hover:bg-black hover:bg-opacity-5 p-3 rounded transition-colors duration-200">
              <h4 className="font-medium text-black">{job.title}</h4>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-600">
                  <span className="mr-3">{job.mode}</span>
                  <span>{job.location}</span>
                </div>
                <button
                  disabled={!isUserTrained}
                  className={`px-4 py-1 rounded text-sm transition-all duration-300 ${
                    isUserTrained 
                      ? 'bg-yellow-400 text-black hover:bg-yellow-500' 
                      : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Apply
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Posted: {job.postedDate}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No job posts available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default LatestJobPosts;
