import * as z from 'zod';

// Reusable Validation Schemas
export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*()]/, 'Password must contain at least one special character');

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

export const phoneSchema = z.string()
  .regex(/^[0-9]{10,14}$/, 'Invalid phone number');

export const teacherRegistrationSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  gender: z.enum(['male', 'female'], { 
    errorMap: () => ({ message: 'Please select a valid gender' }) 
  }),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  state: z.string().min(2, 'State is required'),
  experience: z.number().min(0, 'Experience must be a positive number'),
  qualification: z.string().min(2, 'Qualification is required'),
  preferredLevel: z.array(z.enum(['Primary', 'Secondary', 'Higher Education'])).optional()
});

export const parentRegistrationSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  children: z.array(z.object({
    name: nameSchema,
    age: z.number().min(3, 'Child age must be at least 3').max(18, 'Child age must be less than 18'),
    grade: z.string().min(1, 'Grade is required')
  })).min(1, 'At least one child is required')
});

export const schoolRegistrationSchema = z.object({
  schoolName: z.string().min(2, 'School name is required'),
  schoolType: z.array(z.enum(['Primary', 'Secondary', 'Both'])).min(1, 'Select at least one school type'),
  contactPersonName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(5, 'School address is required'),
  state: z.string().min(2, 'State is required')
});