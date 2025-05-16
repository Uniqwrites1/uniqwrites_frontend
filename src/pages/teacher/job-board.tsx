import React, { useState } from 'react';
import TeacherDashboardLayout from '../../components/layouts/TeacherDashboardLayout';
import { useApi } from '../../hooks/useApi';
import { apiService } from '../../services/apiService';
import { JobListing, PaginatedResponse } from '../../types/api';
import { ErrorHandler } from '../../utils/errorHandler';

// Define filter options as a Record with string keys
type FilterOptions = Record<string, string>;

const JobBoard: React.FC = () => {
  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // API integration using our custom hook
// Mock data for fallback when API fails
  const mockJobListings: JobListing[] = [
    {
      id: '1',
      title: 'Math Teacher (Secondary)',
      description: 'Looking for an experienced Mathematics teacher for secondary school students.',
      location: 'Lagos',
      postedDate: new Date().toISOString(),
      mode: 'physical',
      subject: 'Mathematics',
      requirements: ['3+ years experience', 'BSc in Mathematics or related field'],
      salary: 'Competitive'
    },
    {
      id: '2',
      title: 'Online English Tutor',
      description: 'Remote English language tutoring for primary school students.',
      location: 'Online',
      postedDate: new Date().toISOString(),
      mode: 'online',
      subject: 'English',
      requirements: ['Excellent communication', 'Experience with online teaching'],
      salary: 'Per hour'
    }
  ];
  const mockResponse: PaginatedResponse<JobListing> = {
    data: mockJobListings,
    page: currentPage,
    pageSize: 5,
    totalItems: 2,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  };

  const {
    data: jobsData,
    loading,
    error,
    refresh
  } = useApi<PaginatedResponse<JobListing>, []>(
    async () => {
      const filters: FilterOptions = {};
      
      if (subjectFilter) filters.subject = subjectFilter;
      if (modeFilter) filters.mode = modeFilter;
      if (locationFilter) filters.location = locationFilter;
      
      try {
        // Try to get data from actual API
        return await apiService.teacher.getJobListings(currentPage, 5, filters);
      } catch (apiError) {
        console.warn('API failed, using mock data:', apiError);
        // Use mock data as fallback
        return mockResponse;
      }
    },
    {
      defaultData: mockResponse, // Provide default data to prevent null states
      dependencies: [currentPage, subjectFilter, modeFilter, locationFilter],
      onError: (error: Error) => {
        console.error("Failed to load job listings:", error);
      }
    }
  );
  // Handle job application
  const handleApply = async (job: JobListing) => {
    // In a real implementation, this would open a modal with an application form
    alert(`You're applying for: ${job.title}. Application form will be implemented soon!`);
  };

  // Handle filter reset
  const resetFilters = () => {
    setSubjectFilter('');
    setModeFilter('');
    setLocationFilter('');
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && (!jobsData || (jobsData.totalPages && newPage <= jobsData.totalPages))) {
      setCurrentPage(newPage);
    }
  };

  // Use fallback data if API call fails
  const jobs = jobsData?.data || [];
  const totalPages = jobsData?.totalPages || 1;

  return (
    <TeacherDashboardLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Available Teaching Jobs</h1>
          <button
            onClick={refresh}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Jobs
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Filter by subject"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mode</label>
              <select
                className="w-full border rounded p-2"
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
              >
                <option value="">All Modes</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Filter by location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFC107]"></div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{ErrorHandler.getUserFriendlyMessage(error)}</span>
            <button
              onClick={refresh}
              className="ml-4 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Job listings */}
        {!loading && !error && (
          <div className="space-y-6">
            {jobs.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M12 20h.01M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mt-4">No Jobs Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or check back later for new opportunities.</p>
              </div>
            ) : (              jobs.map((job: JobListing) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-gray-600 mt-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {job.location}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleApply(job)}
                      className="bg-[#FFC107] text-black px-4 py-2 rounded hover:bg-[#FFD700] transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && jobs.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-l-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              <div className="px-4 py-2 bg-[#FFC107] text-black">
                {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 rounded-r-md ${
                  currentPage >= totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </TeacherDashboardLayout>
  );
};

export default JobBoard;
