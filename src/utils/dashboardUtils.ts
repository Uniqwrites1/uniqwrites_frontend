/**
 * Utility functions for dashboard features
 */

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date));
};

export const formatDateTime = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const getFileIcon = (fileType: string): string => {
  const icons: Record<string, string> = {
    'application/pdf': '📄',
    'video/mp4': '🎥',
    'application/msword': '📝',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
    'image/jpeg': '🖼️',
    'image/png': '🖼️'
  };
  return icons[fileType] || '📎';
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, { bg: string; text: string }> = {
    published: { bg: 'bg-green-100', text: 'text-green-800' },
    draft: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    pending: { bg: 'bg-blue-100', text: 'text-blue-800' },
    completed: { bg: 'bg-green-100', text: 'text-green-800' },
    failed: { bg: 'bg-red-100', text: 'text-red-800' }
  };
  return colors[status]?.bg + ' ' + colors[status]?.text || 'bg-gray-100 text-gray-800';
};

export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / ratings.length).toFixed(1));
};

export const validateYouTubeUrl = (url: string): boolean => {
  const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return pattern.test(url);
};

export const extractYouTubeId = (url: string): string | null => {
  const pattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
};
