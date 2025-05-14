import React, { useState, ReactNode } from 'react';

interface ReadMoreProps {
  children: ReactNode;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className={`transition-all duration-300 ${!isExpanded ? 'max-h-[150px]' : ''} overflow-hidden relative`}>
        {children}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium focus:outline-none underline"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};

export default ReadMore;
