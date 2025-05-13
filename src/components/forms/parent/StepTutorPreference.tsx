import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  preferredGender: yup.string().required("Please select preferred gender"),
  languagePreference: yup.string().required("Please specify language preference"),
  qualificationsPriority: yup.string().optional()
});

interface StepTutorPreferenceProps {
  formData: {
    preferredGender: string;
    languagePreference: string;
    qualificationsPriority: string;
  };
  updateFormData: (field: keyof StepTutorPreferenceProps['formData'], value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepTutorPreference: React.FC<StepTutorPreferenceProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >      <form onSubmit={handleSubmit((data) => {
        // Update form data
        Object.entries(data).forEach(([key, value]) => {
          updateFormData(key, value);
        });
        // Call onNext which will trigger form submission and navigation
        onNext();
      })} className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Preferred Tutor Gender
          </label>
          <select
            {...register("preferredGender")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select preferred gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">No Preference</option>
          </select>
          {errors.preferredGender && (
            <p className="mt-1 text-sm text-red-600">{errors.preferredGender.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Language Preference
          </label>
          <input
            type="text"
            {...register("languagePreference")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="e.g., English, Yoruba, French"
          />
          {errors.languagePreference && (
            <p className="mt-1 text-sm text-red-600">{errors.languagePreference.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2">
            Qualification Priority (Optional)
          </label>
          <select
            {...register("qualificationsPriority")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select qualification priority</option>
            <option value="phd">PhD Holder</option>
            <option value="masters">Masters Degree</option>
            <option value="bachelors">Bachelors Degree</option>
            <option value="teachingCert">Teaching Certification</option>
            <option value="experience">Experience Over Qualifications</option>
          </select>
          {errors.qualificationsPriority && (
            <p className="mt-1 text-sm text-red-600">{errors.qualificationsPriority.message}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            This helps us match you with tutors that best meet your qualification preferences.
          </p>
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
            Submit Request
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StepTutorPreference;
