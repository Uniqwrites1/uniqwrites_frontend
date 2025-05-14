import React from 'react';
import { Star } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, className = '' }) => (
  <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {icon && <div className="text-yellow-400">{icon}</div>}
    </div>
  </div>
);

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label, className = '' }) => (
  <div className={className}>
    {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className="bg-yellow-400 h-4 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
    <div className="text-sm text-gray-600 mt-1">{progress}%</div>
  </div>
);

interface RatingDisplayProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({ rating, size = 'md', showValue = true }) => {
  const starSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {Array(5).fill(0).map((_, i) => (
          <Star
            key={i}
            size={starSizes[size]}
            className={`${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, icon, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive 
        ? 'bg-yellow-400 text-black' 
        : 'text-yellow-400 hover:bg-gray-800'
    }`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span>{children}</span>
  </button>
);

interface ActionButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className = ''
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200';
  
  const variantStyles = {
    primary: 'bg-black text-yellow-400 hover:bg-gray-800 focus:ring-yellow-400',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400'
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
