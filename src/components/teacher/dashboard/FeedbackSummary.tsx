import React from 'react';
import { Star } from 'lucide-react';

interface FeedbackSummaryProps {
  rating: number;
  reviewCount: number;
}

const FeedbackSummary: React.FC<FeedbackSummaryProps> = ({ rating, reviewCount }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Feedback Rating</h3>
      <div className="flex items-center mb-2">
        <p className="text-3xl font-bold text-yellow-500 mr-2">{rating.toFixed(1)}</p>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              size={20}
              fill={i < Math.floor(rating) ? "#FFD700" : "none"}
              stroke={i < Math.floor(rating) ? "#FFD700" : "#CBD5E0"}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600">Based on {reviewCount} reviews</p>
    </div>
  );
};

export default FeedbackSummary;
