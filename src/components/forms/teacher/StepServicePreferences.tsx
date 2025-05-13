import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  availabilityMode: yup.string().required("Please select an availability mode"),
  preferredOpportunities: yup.string().required("Please enter your preferred opportunities"),
  tutoringModes: yup.array().min(1, "Please select at least one tutoring mode"),
  subjects: yup.string().required("Please enter subjects you can teach")
});

interface FormData {
  availabilityMode: string;
  preferredOpportunities: string;
  tutoringModes: string[];
  subjects: string;
}

interface StepServicePreferencesProps {
  formData: Partial<FormData>;
  updateFormData: (field: string, value: string | string[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepServicePreferences: React.FC<StepServicePreferencesProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const onSubmit = (data: FormData) => {
    Object.entries(data).forEach(([key, value]) => {
      updateFormData(key, value);
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Availability Mode</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="online"
              {...register("availabilityMode")}
              className="mr-2"
            />
            Online
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="physical"
              {...register("availabilityMode")}
              className="mr-2"
            />
            Physical
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="both"
              {...register("availabilityMode")}
              className="mr-2"
            />
            Both
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Preferred Opportunities</label>
        <input
          type="text"
          {...register("preferredOpportunities")}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="Enter your preferred opportunities"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tutoring Modes</label>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="homeTutoring"
              {...register("tutoringModes")}
              className="h-4 w-4"
            />
            <span>Home Tutoring</span>
          </label>
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="homeSchooling"
              {...register("tutoringModes")}
              className="h-4 w-4"
            />
            <span>Home Schooling</span>
          </label>
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded">
            <input
              type="checkbox"
              value="schoolTutors"
              {...register("tutoringModes")}
              className="h-4 w-4"
            />
            <span>School Tutors</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Subjects</label>
        <input
          type="text"
          {...register("subjects")}
          className="mt-1 block w-full border rounded px-3 py-2"
          placeholder="Enter subjects you can teach (comma-separated)"
        />
      </div>      <div className="flex justify-between pt-6">
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

