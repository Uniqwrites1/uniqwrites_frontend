// Common dashboard types
export interface DashboardUser {
  id: string;
  fullName: string;
  email: string;
  role: 'teacher' | 'parent' | 'admin' | 'school';
  avatar?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'doc' | 'video' | 'worksheet';
  url: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonFeedback {
  id: string;
  studentId: string;
  studentName: string;
  tutorId: string;
  tutorName: string;
  lessonId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface JobPost {
  id: string;
  title: string;
  subjects: string[];
  level: 'primary' | 'secondary' | 'tertiary';
  location: string;
  mode: 'online' | 'physical' | 'hybrid';
  status: 'open' | 'assigned' | 'completed';
  budget: number;
  description: string;
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'document';
  content: string;
  duration: number; // in minutes
  order: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  coverImage?: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface TransactionRecord {
  id: string;
  type: 'payment' | 'withdrawal';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface TeacherDashboardData {
  user: DashboardUser;
  trainingProgress: number;
  jobPostings: JobPost[];
  resources: Resource[];
  feedback: LessonFeedback[];
  transactions: TransactionRecord[];
}

export interface ParentDashboardData {
  user: DashboardUser;
  children: {
    id: string;
    name: string;
    grade: string;
    subjects: string[];
  }[];
  activeTutors: {
    id: string;
    name: string;
    subject: string;
    nextLesson: string;
  }[];
  resources: Resource[];
  feedback: LessonFeedback[];
}

export interface AdminDashboardData {
  user: DashboardUser;
  stats: {
    totalTeachers: number;
    activeStudents: number;
    completedLessons: number;
    monthlyRevenue: number;
  };
  pendingApprovals: {
    teachers: number;
    resources: number;
    blogPosts: number;
  };
  recentTransactions: TransactionRecord[];
  recentFeedback: LessonFeedback[];
}
