/**
 * PostgreSQL database type definitions
 * These types represent the structure of our PostgreSQL database tables
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'teacher' | 'parent' | 'school' | 'admin'
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'teacher' | 'parent' | 'school' | 'admin'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'teacher' | 'parent' | 'school' | 'admin'
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          price: number
          instructor_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description?: string | null
          category: string
          price: number
          instructor_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          price?: number
          instructor_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Additional tables from the original supabase.ts file
      // Updated to match our PostgreSQL schema
    }
  }
}

// Export specific types for easier usage throughout the application
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Course = Database['public']['Tables']['courses']['Row']

/**
 * API Response types
 * These represent the shape of data returned from our API that's connected to PostgreSQL
 */
export interface ApiProfileResponse {
  status: 'success' | 'error'
  data?: Profile
  message?: string
}

export interface ApiCoursesResponse {
  status: 'success' | 'error'
  data?: Course[]
  message?: string
  pagination?: {
    total: number
    page: number
    limit: number
  }
}
