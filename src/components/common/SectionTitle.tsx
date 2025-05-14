import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <h3 className="text-2xl font-bold text-yellow-500 mb-3 mt-6">
      {children}
    </h3>
  );
};

export default SectionTitle;
