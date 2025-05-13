import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ErrorHandler } from '../../../utils/errorHandler';
import { PerformanceMonitor } from '../../../utils/performance';
import { useNavigate } from 'react-router-dom';

// Comprehensive Validation Schema
const ParentTutoringRequestSchema = z.object({
  parentDetails: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string()
      .regex(/^[0-9]{10,14}$/, "Phone number must be 10-14 digits"),
    relationshipToStudent: z.string().min(2, "Relationship is required")
  }),

  students: z.array(z.object({
    name: z.string().min(2, "Student name is required"),
    age: z.number().min(3, "Student must be at least 3 years old").max(18, "Student cannot be older than 18"),
    currentClass: z.string().min(1, "Current class is required"),
    specialNeeds: z.string().optional()
  })).min(1, "At least one student is required"),

  tutoringRequirements: z.object({
    subjectsRequested: z.string().min(1, "At least one subject must be requested"),
    preferredMode: z.enum(["online", "physical", "both"], {
      errorMap: () => ({ message: "Select a tutoring mode" })
    }),
    preferredDays: z.object({
      sunday: z.boolean().optional(),
      monday: z.boolean().optional(),
      tuesday: z.boolean().optional(),
      wednesday: z.boolean().optional(),
      thursday: z.boolean().optional(),
      friday: z.boolean().optional(),
      saturday: z.boolean().optional()
    }),
    durationPerLesson: z.string().min(1, "Lesson duration is required"),
    startDate: z.string().refine((date) => {
      const inputDate = new Date(date);
      const today = new Date();
      return inputDate >= today;
    }, { message: "Start date must be in the future" })
  }),

  tutorPreferences: z.object({
    preferredGender: z.enum(["male", "female", "any"], {
      errorMap: () => ({ message: "Select a preferred tutor gender" })
    }),
    languagePreference: z.string().optional(),
    qualificationsPriority: z.string().optional()
  })
});

type ParentTutoringRequestData = z.infer<typeof ParentTutoringRequestSchema>;

const ParentTutoringRequestForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formLoading, setFormLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const navigate = useNavigate();
  const performanceMonitor = PerformanceMonitor.getInstance();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues
  } = useForm<ParentTutoringRequestData>({
    resolver: zodResolver(ParentTutoringRequestSchema),
    defaultValues: {
      students: [{ name: '', age: 0, currentClass: '', specialNeeds: '' }],
      tutoringRequirements: {
        preferredDays: {}
      }
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "students"
  });

  const validateCurrentStep = async () => {
    setFormLoading(true);
    try {
      let isStepValid = false;
      switch(step) {
        case 1:
          isStepValid = await trigger("parentDetails");
          break;
        case 2:
          isStepValid = await trigger("students");
          break;
        case 3:
          isStepValid = await trigger("tutoringRequirements");
          break;
        case 4:
          isStepValid = await trigger("tutorPreferences");
          break;
      }

      if (isStepValid) {
        setStep(prevStep => prevStep + 1);
      }
    } catch (error) {
      ErrorHandler.logError(error as Error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormSubmit = async (data: ParentTutoringRequestData) => {
    setFormLoading(true);
    setSubmissionError(null);

    try {
      performanceMonitor.startMark("parentTutoringRequest");

      // Simulate backend submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to signup with prefilled data
    navigate('/signup/parent', {
      state: {
          prefilledData: data,
        source: 'parent-tutoring-request'
      }
    });

      performanceMonitor.endMark("parentTutoringRequest");
    } catch (error) {
      const userFriendlyError = ErrorHandler.getUserFriendlyMessage(error as Error);
      setSubmissionError(userFriendlyError);
      ErrorHandler.logError(error as Error);
    } finally {
      setFormLoading(false);
    }
};

  const renderStepContent = () => {
    switch(step) {
      case 1:
  return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Parent/Guardian Details</h2>
            <input
              {...register("parentDetails.fullName")}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            {errors.parentDetails?.fullName && (
              <p className="text-red-500">{errors.parentDetails.fullName.message}</p>
            )}
            <input
              {...register("parentDetails.email")}
              placeholder="Email"
              type="email"
              className="w-full p-2 border rounded"
            />
            {errors.parentDetails?.email && (
              <p className="text-red-500">{errors.parentDetails.email.message}</p>
            )}
            {/* Add more parent details fields */}
      </div>
  );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Student Information</h2>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2 mb-4">
                <input
                  {...register(`students.${index}.name`)}
                  placeholder="Student Name"
                  className="w-full p-2 border rounded"
                />
                {errors.students?.[index]?.name && (
                  <p className="text-red-500">{errors.students[index]?.name?.message}</p>
                )}
                {/* Add more student fields */}
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ name: '', age: 0, currentClass: '', specialNeeds: '' })}
              className="bg-black text-yellow-400 px-4 py-2 rounded"
            >
              Add Another Student
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Tutoring Requirements</h2>
            <input
              {...register("tutoringRequirements.subjectsRequested")}
              placeholder="Subjects Requested"
              className="w-full p-2 border rounded"
            />
            {errors.tutoringRequirements?.subjectsRequested && (
              <p className="text-red-500">{errors.tutoringRequirements.subjectsRequested.message}</p>
            )}
            {/* Add more tutoring requirement fields */}
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Tutor Preferences</h2>
            <select
              {...register("tutorPreferences.preferredGender")}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Preferred Tutor Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="any">Any</option>
            </select>
            {errors.tutorPreferences?.preferredGender && (
              <p className="text-red-500">{errors.tutorPreferences.preferredGender.message}</p>
            )}
            {/* Add more tutor preference fields */}
          </div>
        );
      default:
        return null;
    }
};

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <div className="bg-black text-yellow-400 text-center py-4 rounded-t-lg">
        <h1 className="text-3xl font-bold">Parent Tutoring Request</h1>
      </div>

      {/* Loading Overlay */}
      {(formLoading || isSubmitting) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
        </div>
      )}

      {/* Error Alert */}
      {submissionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submissionError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {renderStepContent()}

        <div className="flex justify-between p-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Previous
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={validateCurrentStep}
              className="bg-black text-yellow-400 px-4 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-black text-yellow-400 px-4 py-2 rounded"
              disabled={formLoading || isSubmitting}
            >
              Submit Request
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ParentTutoringRequestForm;

