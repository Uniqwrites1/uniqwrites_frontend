import { create } from 'zustand';

interface TeacherState {
  isTrainingCompleted: boolean;
  trainingProgress: number;
  earnings: number;
  feedbackRating: number;
  reviewCount: number;
  setTrainingProgress: (progress: number) => void;
}

export const useTeacherStore = create<TeacherState>((set: (state: Partial<TeacherState>) => void) => ({
  isTrainingCompleted: false,
  trainingProgress: 0,
  earnings: 0,
  feedbackRating: 0,
  reviewCount: 0,
  setTrainingProgress: (progress: number) => set({ 
    trainingProgress: progress,
    isTrainingCompleted: progress === 100
  }),
}));
