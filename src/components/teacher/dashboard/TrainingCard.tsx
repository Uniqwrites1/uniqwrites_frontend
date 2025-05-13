import React from 'react';

interface TrainingCardProps {
  progress: number;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ progress }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Training Progress</h3>
      <p className="text-3xl font-bold text-violet-600 mb-2">{progress}%</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-violet-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        {progress < 100 
          ? 'Complete your training to apply for jobs' 
          : 'All training modules completed!'}
      </p>
    </div>
  );
};

export default TrainingCard;
