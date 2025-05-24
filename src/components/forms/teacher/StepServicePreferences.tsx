import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorHandler } from "../../../utils/errorHandler";

const schema = yup.object({
  availableMode: yup.array().of(yup.string()).min(1, "Please select at least one availability mode"),
  preferredOpportunities: yup.array().of(yup.string()).min(1, "Please select at least one preferred opportunity"),
  subjectsOfExpertise: yup.array().of(yup.string()).min(1, "Please select at least one subject you can teach")
}).required();

interface FormData {
  availableMode: string[];
  preferredOpportunities: string[];
  subjectsOfExpertise: string[];
}

interface StepServicePreferencesProps {
  formData: {
    availableMode: string[];
    preferredOpportunities: string[];
    subjectsOfExpertise: string[];
    [key: string]: unknown;
  };
  updateFormData: (field: string, value: string[] | unknown) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepServicePreferences: React.FC<StepServicePreferencesProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const [error, setError] = useState<string | null>(null);
  
  // Create type-safe defaultValues
  const defaultValues: FormData = {
    availableMode: formData.availableMode || [],
    preferredOpportunities: formData.preferredOpportunities || [],
    subjectsOfExpertise: formData.subjectsOfExpertise || []
  };
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: yupResolver(schema) as unknown as Resolver<FormData>,
    defaultValues
  });

  const handleFormSubmit = handleSubmit((data: FormData) => {
    try {
      setError(null);
      
      // Update each field in parent component
      updateFormData("availableMode", data.availableMode);
      updateFormData("preferredOpportunities", data.preferredOpportunities);
      updateFormData("subjectsOfExpertise", data.subjectsOfExpertise);
      
      onNext();
    } catch (err) {
      const message = ErrorHandler.getUserFriendlyMessage(err);
      setError(message);
    }
  });
  
  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-2">Available Mode</label>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="online"
              {...register("availableMode")}
              className="h-4 w-4"
            />
            <span>Online</span>
          </label>
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="physical"
              {...register("availableMode")}
              className="h-4 w-4"
            />
            <span>Physical</span>
          </label>
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="both"
              {...register("availableMode")}
              className="h-4 w-4"
            />
            <span>Both Options</span>
          </label>
        </div>
        {errors.availableMode && (
          <p className="text-red-500 text-sm mt-1">{errors.availableMode.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Preferred Opportunities</label>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="homeTutoring"
              {...register("preferredOpportunities")}
              className="h-4 w-4"
            />
            <span>Home Tutoring</span>
          </label>
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="homeSchooling"
              {...register("preferredOpportunities")}
              className="h-4 w-4"
            />
            <span>Home Schooling</span>
          </label>
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="schoolTutors"
              {...register("preferredOpportunities")}
              className="h-4 w-4"
            />
            <span>School Tutors</span>
          </label>
        </div>
        {errors.preferredOpportunities && (
          <p className="text-red-500 text-sm mt-1">{errors.preferredOpportunities.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium">Subjects of Expertise</label>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-2">Select subjects you're proficient in teaching</p>
          <div className="grid grid-cols-3 gap-2">
            {['Mathematics', 'English', 'Science', 'Social Studies', 'Physics', 'Chemistry', 
              'Biology', 'Literature', 'History', 'Geography', 'Economics', 'Computer Science'].map(subject => (
              <label key={subject} className="flex items-center space-x-2 bg-gray-50 p-2 rounded border">
                <input
                  type="checkbox"
                  value={subject}
                  {...register("subjectsOfExpertise")}
                  className="h-4 w-4"
                />
                <span className="text-sm">{subject}</span>
              </label>
            ))}
          </div>
        </div>
        {errors.subjectsOfExpertise && (
          <p className="text-red-500 text-sm mt-1">{errors.subjectsOfExpertise.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 font-semibold"
        >
          Previous Step
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#FFC107] text-black rounded-md hover:bg-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 transition-all duration-200 font-semibold"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default StepServicePreferences;

