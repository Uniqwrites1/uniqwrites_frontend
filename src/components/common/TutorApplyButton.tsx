import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TutorApplyButtonProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

const TutorApplyButton: React.FC<TutorApplyButtonProps> = ({
  variant = 'primary',
  className = '',
  children = 'Become a Tutor'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/apply-tutor');
  };

  const baseStyles = "px-6 py-3 rounded-md font-semibold transition-all duration-200";
  const variantStyles = {
    primary: "bg-[#FFC107] text-black hover:bg-[#FFD700] focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2",
    secondary: "bg-black text-[#FFC107] hover:bg-gray-900 focus:ring-2 focus:ring-black focus:ring-offset-2"
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default TutorApplyButton;
