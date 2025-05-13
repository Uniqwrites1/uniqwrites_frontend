import axios, { AxiosResponse } from 'axios';
import { ErrorHandler } from '../utils/errorHandler';

// Configuration for API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.uniqwrites.com/v1';

// Define types for API requests and responses
interface TeacherData {
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

interface TutoringRequestData {
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

interface SchoolServiceData {
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

interface SignupData {
  email: string;
  password: string;
  role: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  };
}

interface LoginResponse {
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

// Create axios instance with default configurations
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor for adding authentication token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor for global error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Log and handle errors consistently
    ErrorHandler.logError(error);

    if (error.response) {
      // Server responded with an error status
      switch (error.response.status) {
        case 400:
          throw new Error('Bad Request: Invalid data');
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          throw new Error('Forbidden: You do not have permission');
        case 404:
          throw new Error('Not Found: Resource does not exist');
        case 500:
          throw new Error('Server Error: Please try again later');
        default:
          throw new Error('An unexpected error occurred');
      }
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network Error: No response from server');
    } else {
      // Error in setting up the request
      throw new Error('Error: Request could not be sent');
    }

    return Promise.reject(error);
  }
);

// Logging utility for API calls
const logApiCall = (method: string, url: string, data?: unknown): void => {
  console.log(`[API Call] ${method.toUpperCase()} ${url}`, data);
};

// API Service with strongly typed methods
const apiServiceImpl = {
  // Teacher Registration
  registerTeacher: async (teacherData: TeacherData): Promise<AxiosResponse<any>> => {
    try {
      logApiCall('POST', '/teachers/register', teacherData);
      const response = await apiClient.post('/teachers/register', teacherData);
      return response.data;
    } catch (error) {
      ErrorHandler.logError(error as Error);
      throw error;
    }
  },

  // Parent Tutoring Request
  submitTutoringRequest: async (requestData: TutoringRequestData): Promise<AxiosResponse<any>> => {
    try {
      logApiCall('POST', '/requests/tutoring', requestData);
      const response = await apiClient.post('/requests/tutoring', requestData);
      return response.data;
    } catch (error) {
      ErrorHandler.logError(error as Error);
      throw error;
    }
  },

  // School Service Request
  submitSchoolServiceRequest: async (requestData: SchoolServiceData): Promise<AxiosResponse<any>> => {
    try {
      logApiCall('POST', '/requests/school-services', requestData);
      const response = await apiClient.post('/requests/school-services', requestData);
      return response.data;
    } catch (error) {
      ErrorHandler.logError(error as Error);
      throw error;
    }
  },

  // Authentication Services
  login: async (email: string, password: string, role: string): Promise<LoginResponse> => {
    try {
      logApiCall('POST', '/auth/login', { email, role });
      const response = await apiClient.post('/auth/login', { email, password, role });
      // Store token and user info
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      ErrorHandler.logError(error as Error);
      throw error;
    }
  },

  signup: async (userData: SignupData): Promise<LoginResponse> => {
    try {
      logApiCall('POST', '/auth/signup', { email: userData.email, role: userData.role });
      const response = await apiClient.post('/auth/signup', userData);
      // Store token and user info
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      ErrorHandler.logError(error as Error);
      throw error;
    }
  },

  // Utility method to check authentication status
  checkAuthStatus: async (): Promise<{ isAuthenticated: boolean } | null> => {
    try {
      const response = await apiClient.get('/auth/status');
      return response.data;
    } catch (error: unknown) {
      // Clear token if not valid
      localStorage.removeItem('authToken');
      return null;
    }
  }
};

// Export API Service
export const ApiService = apiServiceImpl;

export default apiClient;

