import React from 'react';
import { Link } from 'react-router-dom';

interface EarningsCardProps {
  amount: number;
}

const EarningsCard: React.FC<EarningsCardProps> = ({ amount }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
      <p className="text-3xl font-bold text-green-600 mb-2">₦{amount.toLocaleString()}</p>
      <Link 
        to="/teacher/wallet" 
        className="text-violet-600 text-sm hover:underline"
      >
        View earnings details →
      </Link>
    </div>
  );
};

export default EarningsCard;
