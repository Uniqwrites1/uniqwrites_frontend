import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ErrorHandler } from "../../../utils/errorHandler";
import { PerformanceMonitor } from "../../../utils/performance";

// Comprehensive Validation Schema
const TeacherRegistrationSchema = z.object({
  personalDetails: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string()
      .regex(/^[0-9]{10,14}$/, "Phone number must be 10-14 digits"),
    gender: z.enum(["male", "female"], { 
      errorMap: () => ({ message: "Please select a valid gender" }) 
    }),
    dateOfBirth: z.string().refine((date) => {
      const inputDate = new Date(date);
      const minAge = new Date();
      minAge.setFullYear(minAge.getFullYear() - 18);
      return inputDate <= minAge;
    }, { message: "You must be at least 18 years old" }),
    address: z.string().min(5, "Address must be at least 5 characters"),
    state: z.string().min(2, "State is required")
  }),
  
  academicDetails: z.object({
    qualification: z.string().min(2, "Qualification is required"),
    certifications: z.string().optional(),
    experience: z.number()
      .min(0, "Experience must be a non-negative number")
      .max(50, "Experience cannot exceed 50 years"),
    preferredLevels: z.array(
      z.enum(["Primary", "Secondary", "Higher Education"])
    ).min(1, "Select at least one preferred teaching level")
  }),
  
  servicePreferences: z.object({
    tutoringModes: z.array(
      z.enum(["homeTutoring", "homeSchooling", "schoolTutors"])
    ).min(1, "Select at least one tutoring mode"),
    availabilityMode: z.enum(["online", "physical", "both"], {
      errorMap: () => ({ message: "Select an availability mode" })
    }),
    subjects: z.string().min(1, "List at least one subject you can teach")
  }),

  uploads: z.object({
    cv: z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "CV must be less than 5MB"
    }),
    photo: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Photo must be less than 2MB"
    }),
    certificates: z.instanceof(File).optional()
  })
});

type TeacherRegistrationData = z.infer<typeof TeacherRegistrationSchema>;

const TeacherRegistrationForm: React.FC<{ 
  onSubmit?: (event: React.FormEvent) => void 
}> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formLoading, setFormLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues
  } = useForm<TeacherRegistrationData>({
    resolver: zodResolver(TeacherRegistrationSchema)
  });

  const performanceMonitor = PerformanceMonitor.getInstance();

  const validateCurrentStep = async () => {
    setFormLoading(true);
    try {
      let isStepValid = false;
      switch(step) {
        case 1:
          isStepValid = await trigger("personalDetails");
          break;
        case 2:
          isStepValid = await trigger("academicDetails");
          break;
        case 3:
          isStepValid = await trigger("servicePreferences");
          break;
        case 4:
          isStepValid = await trigger("uploads");
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

  const handleFormSubmit = async (data: TeacherRegistrationData) => {
    setFormLoading(true);
    setSubmissionError(null);

    try {
      performanceMonitor.startMark("teacherRegistration");

      // Simulate backend submission
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (onSubmit) {
        onSubmit(data as unknown as React.FormEvent);
      }

      performanceMonitor.endMark("teacherRegistration");
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
          <div>
            <h2 className="text-xl font-bold mb-4">Personal Details</h2>
            {/* Personal Details Form Fields */}
            <input 
              {...register("personalDetails.fullName")}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            {errors.personalDetails?.fullName && (
              <p className="text-red-500">{errors.personalDetails.fullName.message}</p>
            )}
            {/* Add more fields */}
          </div>
        );
      // Similar cases for other steps
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
            <input 
              type="file"
              {...register("uploads.cv")}
              className="w-full p-2 border rounded"
            />
            {errors.uploads?.cv && (
              <p className="text-red-500">{errors.uploads.cv.message}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <div className="bg-black text-yellow-400 text-center py-4 rounded-t-lg">
        <h1 className="text-3xl font-bold">Teachers Registration Form</h1>
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
              Submit Application
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TeacherRegistrationForm;