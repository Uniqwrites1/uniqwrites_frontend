import React from 'react';
import TeacherDashboardLayout from '../../components/layouts/TeacherDashboardLayout';
import TrainingCard from '../../components/teacher/dashboard/TrainingCard';
import EarningsCard from '../../components/teacher/dashboard/EarningsCard';
import FeedbackSummary from '../../components/teacher/dashboard/FeedbackSummary';
import LatestJobPosts from '../../components/teacher/dashboard/LatestJobPosts';

// Mock data - in a real app, this would come from an API
const mockJobs = [
  {
    id: '1',
    title: 'Mathematics Tutor for Secondary School',
    mode: 'Online' as const,
    location: 'Lagos',
    postedDate: '2 days ago'
  },
  {
    id: '2',
    title: 'English Language Teacher',
    mode: 'Physical' as const,
    location: 'Abuja',
    postedDate: '1 week ago'
  },
  {
    id: '3',
    title: 'Science Tutor for Primary School',
    mode: 'Hybrid' as const,
    location: 'Port Harcourt',
    postedDate: 'Today'
  }
];

const TeacherDashboard: React.FC = () => {
  // In a real app, these would come from API/state
  const teacherName = "John Doe";
  const trainingProgress = 75;
  const totalEarnings = 250000;
  const feedbackRating = 4.7;
  const reviewCount = 23;
  const isUserTrained = trainingProgress === 100;

  return (
    <TeacherDashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {teacherName}</h1>
        <p className="text-gray-600">Here's an overview of your activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <TrainingCard progress={trainingProgress} />
        <EarningsCard amount={totalEarnings} />
        <FeedbackSummary rating={feedbackRating} reviewCount={reviewCount} />
      </div>

      <LatestJobPosts jobs={mockJobs} isUserTrained={isUserTrained} />
    </TeacherDashboardLayout>
  );
};

export default TeacherDashboard;
