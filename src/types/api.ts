export interface TeacherData {
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    state: string;
  };
  academicDetails: {
    qualification: string;
    certifications?: string;
    experience: number;
    preferredLevels: string[];
  };
  servicePreferences: {
    tutoringModes: string[];
    availabilityMode: string;
    subjects: string;
  };
  uploads?: {
    cv?: File;
    photo?: File;
    certificates?: File;
  };
}

export interface TutoringRequestData {
  parentDetails: {
    fullName: string;
    email: string;
    phoneNumber: string;
    relationshipToStudent: string;
  };
  students: Array<{
    name: string;
    age: number;
    currentClass: string;
    specialNeeds?: string;
  }>;
  tutoringRequirements: {
    subjectsRequested: string;
    preferredMode: string;
    preferredDays: Record<string, boolean>;
    durationPerLesson: string;
    startDate: string;
  };
  tutorPreferences: {
    preferredGender: string;
    languagePreference?: string;
    qualificationsPriority?: string;
  };
}

export interface SchoolServiceData {
  schoolName: string;
  schoolType: string[];
  contactPersonName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  serviceType: string[];
  additionalDetails?: Record<string, unknown>;
}

export interface SignupData {
  email: string;
  password: string;
  role: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  };
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      profilePicture?: string;
    }
  }
}

// API Response Types
export interface APIResponse<T> {
  data: T;
  message?: string;
  status: string;
  success: boolean;
  timestamp?: string;
  code?: string;
}

// Error Response Type
export interface APIErrorResponse {
  message: string;
  status: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

// Paginated Response Type
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Authentication Types
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
  user: {
    id: string;
    email: string;
    role: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      profilePicture?: string;
    }
  }
}

// Dashboard Types
export interface DashboardData {
  stats: Record<string, number>;
  recentActivities: Array<Activity>;
  notifications?: Array<Notification>;
}

export interface Activity {
  id: string;
  description: string; 
  date: string;
  type: 'application' | 'request' | 'message' | 'job' | 'other';
  status?: 'pending' | 'approved' | 'rejected' | 'completed';
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
  type: 'system' | 'application' | 'message';
  actionUrl?: string;
}

// User Profile Types
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  address?: string;
  state?: string;
  role: string;
  bio?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface JobListing {
  id: string;
  title: string;
  description: string;
  location: string;
  postedDate: string;
  salaryRange?: string;
  mode?: 'online' | 'physical' | 'hybrid';
  subject?: string;
  requirements?: string[];
  salary?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicationDate: string;
  status: string;
}
